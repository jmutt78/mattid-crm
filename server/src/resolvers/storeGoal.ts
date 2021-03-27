import { validateStoreGoal } from './../utils/validateStoreGoal';
import { INVITE_USER_PREFIX } from '../constants';
// import { sendEmail } from '../utils/sendEmail';
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
  UseMiddleware,
  InputType,
} from 'type-graphql';
import { StoreGoal } from './../entities/StoreGoals';
import { getConnection } from 'typeorm';
import { v4 } from 'uuid';

import { User } from '../entities/User';
import { isAuth } from '../middleware/isAuth';
import { MyContext } from '../types';
import { FieldError } from './user';

@ObjectType()
class PaginatedStoreGoal {
  @Field(() => [StoreGoal])
  storeGoals: StoreGoal[];
  @Field()
  hasMore: boolean;
}

@ObjectType()
class StoreGoalResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => StoreGoal, { nullable: true })
  storeGoal?: StoreGoal;
}

@InputType()
export class StoreGoalInput {
  @Field()
  goal: string;
  date: Date;
}

@Resolver(StoreGoal)
export class StoreGoalResolver {
  @FieldResolver(() => User)
  user(@Root() storeGoal: StoreGoal, @Ctx() { userLoader }: MyContext) {
    return userLoader.load(storeGoal.creatorId);
  }

  //+++++++++++++++++Get all StoreGoal+++++++++++++++++//
  @Query(() => PaginatedStoreGoal)
  async storeGoals(
    @Arg('limit', () => Int) limit: number,
    @Arg('cursor', () => String, { nullable: true }) cursor: string | null,
    @Ctx() { req }: MyContext,
  ): Promise<PaginatedStoreGoal> {
    const realLimit = Math.min(50, limit);
    const reaLimitPlusOne = realLimit + 1;

    const replacements: any[] = [reaLimitPlusOne];
    const userId = await req.session.userId;
    if (cursor) {
      replacements.push(new Date(parseInt(cursor)));
    }

    const storeGoals = await getConnection().query(
      `
    select s.*
    from storeGoal s
    where "creatorId" = ${userId}
    ${cursor ? `where s."createdAt" < $2` : ''}
    order by s."date" DESC
    limit $1
    `,
      replacements,
    );

    return {
      storeGoals: storeGoals.slice(0, realLimit),
      hasMore: storeGoals.length === reaLimitPlusOne,
    };
  }

  //+++++++++++++++++Get StoreGoal+++++++++++++++++//
  @Query(() => StoreGoal, { nullable: true })
  storeGoal(@Arg('id', () => Int) id: number): Promise<StoreGoal | undefined> {
    return StoreGoal.findOne(id);
  }

  //+++++++++++++++++Create StoreGoal+++++++++++++++++//
  @Mutation(() => StoreGoalResponse)
  @UseMiddleware(isAuth)
  async createStoreGoal(
    @Arg('input') input: StoreGoalInput,
    @Ctx() { req }: MyContext,
  ): Promise<StoreGoalResponse> {
    const errors = validateStoreGoal(input);
    if (errors) {
      return { errors };
    }

    const storeGoal = await StoreGoal.create({
      goal: input.goal,
      date: input.date,
      creatorId: req.session.userId,
    }).save();

    return { storeGoal };
  }

  //+++++++++++++++++Update StoreGoal+++++++++++++++++//
  @Mutation(() => StoreGoal, { nullable: true })
  @UseMiddleware(isAuth)
  async updateStoreGoal(
    @Arg('id', () => Int) id: number,
    @Arg('goal') goal: string,
    @Arg('date') date: Date,

    @Ctx() { req }: MyContext,
  ): Promise<StoreGoal | null> {
    const result = await getConnection()
      .createQueryBuilder()
      .update(StoreGoal)
      .set({ date, goal })
      .where('id = :id and "creatorId" = :creatorId', {
        id,
        creatorId: req.session.userId,
      })
      .returning('*')
      .execute();

    return result.raw[0];
  }

  //+++++++++++++++++Delete StoreGoal+++++++++++++++++//
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteStoreGoal(
    @Arg('id', () => Int) id: number,
    @Ctx() { req }: MyContext,
  ): Promise<boolean> {
    await StoreGoal.delete({ id, creatorId: req.session.userId });
    return true;
  }
}
