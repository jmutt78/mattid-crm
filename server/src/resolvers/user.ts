import { stripe } from './../stripe';
import { UserInput } from './UserInput';
import {
  Resolver,
  Mutation,
  Arg,
  Field,
  Ctx,
  ObjectType,
  Query,
  FieldResolver,
  Root,
} from 'type-graphql';
import { MyContext } from '../types';
import { User, UserRole } from '../entities/User';
import argon2 from 'argon2';
import { COOKIE_NAME, FORGET_PASSWORD_PREFIX } from '../constants';
import { UsernamePasswordInput } from './UsernamePasswordInput';
import { validateRegister } from '../utils/validateRegister';
import { sendEmail } from '../utils/sendEmail';
import { v4 } from 'uuid';
import { getConnection } from 'typeorm';

import { UserAuthInput } from './UserAuthInput';
import { validateUserAuth } from '../utils/validateUserauth';

@ObjectType()
export class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver(User)
export class UserResolver {
  @FieldResolver(() => String)
  email(@Root() user: User, @Ctx() { req }: MyContext) {
    // this is the current user and its ok to show them their own email
    if (req.session.userId === user.id) {
      return user.email;
    }
    // current user wants to see someone elses email
    return '';
  }

  //+++++++++++++++++Change Forgot Password+++++++++++++++++//
  @Mutation(() => UserResponse)
  async changePassword(
    @Arg('token') token: string,
    @Arg('newPassword') newPassword: string,
    @Ctx() { redis, req }: MyContext,
  ): Promise<UserResponse> {
    if (newPassword.length <= 2) {
      return {
        errors: [
          {
            field: 'newPassword',
            message: 'length must be greater than 2',
          },
        ],
      };
    }

    const key = FORGET_PASSWORD_PREFIX + token;
    const userId = await redis.get(key);
    if (!userId) {
      return {
        errors: [
          {
            field: 'token',
            message: 'token expired',
          },
        ],
      };
    }

    const userIdNum = parseInt(userId);
    const user = await User.findOne(userIdNum);

    if (!user) {
      return {
        errors: [
          {
            field: 'token',
            message: 'user no longer exists',
          },
        ],
      };
    }

    await User.update(
      { id: userIdNum },
      {
        password: await argon2.hash(newPassword),
      },
    );

    await redis.del(key);
    // log in user after change password
    req.session.userId = user.id;

    return { user };
  }

  //+++++++++++++++++Update Email, Username and PW+++++++++++++++++//
  @Mutation(() => UserResponse)
  async updateAuth(
    @Arg('input') input: UserAuthInput,
    @Ctx() { req }: MyContext,
  ): Promise<UserResponse> {
    const userId = req.session.userId;
    const errors = validateUserAuth(input);
    if (errors) {
      return { errors };
    }

    let data;
    if (input.password) {
      data = {
        email: input.email,
        password: await argon2.hash(input.password),
      };
    } else {
      data = {
        email: input.email,
      };
    }

    let user;
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .update(User)
        .set(data)
        .where('id = :id', {
          id: userId,
        })
        .returning('*')
        .execute();
      user = result.raw[0];
    } catch (err) {
      if (err.code === '23505') {
        return {
          errors: [
            {
              field: 'email',
              message: 'email already taken',
            },
          ],
        };
      }
    }
    return { user };
  }

  //+++++++++++++++++Forgot Password+++++++++++++++++//
  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg('email') email: string,
    @Ctx() { redis }: MyContext,
  ) {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return true;
    }
    const token = v4();
    await redis.set(
      FORGET_PASSWORD_PREFIX + token,
      user.id,
      'ex',
      1000 * 60 * 60 * 24 * 3,
    ); // 3 days

    await sendEmail(
      email,
      `<a href="https://rich-biff/change-password/${token}">reset password</a>`,
      `Forgot Your Password?`,
    );

    return true;
  }

  //+++++++++++++++++Me+++++++++++++++++//
  @Query(() => User, { nullable: true })
  me(@Ctx() { req }: MyContext) {
    // you are not logged in
    if (!req.session.userId) {
      return null;
    }
    return User.findOne(req.session.userId);
  }

  //+++++++++++++++++Regiseter User+++++++++++++++++//
  @Mutation(() => UserResponse)
  async register(
    @Arg('options') options: UsernamePasswordInput,
    @Ctx() { req }: MyContext,
  ): Promise<UserResponse> {
    const errors = validateRegister(options);
    if (errors) {
      return { errors };
    }

    const hashedPassword = await argon2.hash(options.password);
    let user;
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          email: options.email,
          password: hashedPassword,
          role: UserRole.USER,
        })
        .returning('*')
        .execute();
      user = result.raw[0];
    } catch (err) {
      if (err.code === '23505') {
        return {
          errors: [
            {
              field: 'email',
              message: 'email already taken',
            },
          ],
        };
      }
    }

    req.session.userId = user.id;

    return { user };
  }

  //+++++++++++++++++Log in+++++++++++++++++//
  @Mutation(() => UserResponse)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { req }: MyContext,
  ): Promise<UserResponse> {
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return {
        errors: [
          {
            field: 'email',
            message: "that email doesn't exist",
          },
        ],
      };
    }
    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      return {
        errors: [
          {
            field: 'password',
            message: 'incorrect password',
          },
        ],
      };
    }

    req.session.userId = user.id;

    return {
      user,
    };
  }

  //+++++++++++++++++Subscribe the user+++++++++++++++++//
  @Mutation(() => UserResponse)
  async createSubscription(
    @Arg('source') source: string,
    @Arg('ccLast4') ccLast4: string,
    @Ctx() { req }: MyContext,
  ): Promise<UserResponse> {
    if (!req.session || !req.session.userId) {
      throw new Error('Please log in');
    }
    const userId = req.session.userId;
    const user = await User.findOne({ id: userId });
    const price = process.env.PRICE!;
    if (!user) {
      throw new Error();
    }

    if (user.stripeId || user.stripeSubscriptionId) {
      throw new Error('You are already subscriber.');
    }

    const customer = await stripe.customers.create({
      email: user.email,
      source,
    });

    const subscription = await stripe.subscriptions.create({
      customer: (await customer).id,
      items: [
        {
          price,
        },
      ],
    });

    user.stripeId = (await customer).id;
    user.stripeSubscriptionId = (await subscription).id;
    user.customerType = 'paid';
    user.ccLast4 = ccLast4;
    await user.save();
    return { user };
  }

  //+++++++++++++++++reSubscribe the user with new cc+++++++++++++++++//
  @Mutation(() => UserResponse)
  async reSubribeUserNewCC(
    @Arg('source') source: string,
    @Arg('ccLast4') ccLast4: string,
    @Ctx() { req }: MyContext,
  ): Promise<UserResponse> {
    if (!req.session || !req.session.userId) {
      throw new Error('Please log in');
    }
    const userId = req.session.userId;
    const user = await User.findOne({ id: userId });
    const price = process.env.PRICE!;
    if (!user) {
      throw new Error();
    }

    await stripe.customers.update(user.stripeId, {
      source,
    });

    const subscription = await stripe.subscriptions.create({
      customer: user.stripeId,
      items: [
        {
          price,
        },
      ],
    });

    user.stripeSubscriptionId = (await subscription).id;
    user.customerType = 'paid';
    user.ccLast4 = ccLast4;
    await user.save();
    return { user };
  }

  //+++++++++++++++++reSubscribe the user with existing cc+++++++++++++++++//
  @Mutation(() => UserResponse)
  async reSubribeUserExistingCC(
    @Ctx() { req }: MyContext,
  ): Promise<UserResponse> {
    if (!req.session || !req.session.userId) {
      throw new Error('Please log in');
    }
    const userId = req.session.userId;
    const user = await User.findOne({ id: userId });
    const price = process.env.PRICE!;
    if (!user) {
      throw new Error();
    }

    const subscription = await stripe.subscriptions.create({
      customer: user.stripeId,
      items: [
        {
          price,
        },
      ],
    });

    user.stripeSubscriptionId = (await subscription).id;
    user.customerType = 'paid';

    await user.save();
    return { user };
  }

  //+++++++++++++++++Update Credit Card+++++++++++++++++//
  @Mutation(() => UserResponse)
  async changeCreditCard(
    @Arg('source') source: string,
    @Arg('ccLast4') ccLast4: string,
    @Ctx() { req }: MyContext,
  ): Promise<UserResponse> {
    if (!req.session || !req.session.userId) {
      throw new Error('Please log in');
    }
    const userId = req.session.userId;
    const user = await User.findOne({ id: userId });

    if (!user || !user.stripeId || user.customerType !== 'paid') {
      throw new Error();
    }

    await stripe.customers.update(user.stripeId, {
      source,
    });

    user.ccLast4 = ccLast4;
    await user.save();
    return { user };
  }

  //+++++++++++++++++Cancel Subscription+++++++++++++++++//
  @Mutation(() => UserResponse)
  async cancelSubscription(@Ctx() { req }: MyContext): Promise<UserResponse> {
    if (!req.session || !req.session.userId) {
      throw new Error('Please log in');
    }
    const userId = req.session.userId;
    const user = await User.findOne({ id: userId });

    if (!user || !user.stripeId || user.customerType !== 'paid') {
      throw new Error();
    }

    await stripe.subscriptions.del(user.stripeSubscriptionId);
    user.stripeSubscriptionId = '';
    user.customerType = 'free-trial';
    await user.save();
    return { user };
  }

  //+++++++++++++++++Log Out+++++++++++++++++//
  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) =>
      req.session.destroy((err: any) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }
        resolve(true);
      }),
    );
  }
}
