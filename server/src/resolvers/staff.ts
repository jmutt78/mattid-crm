// import { sendEmail } from '../utils/sendEmail';
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from 'type-graphql';
import { getConnection } from 'typeorm';
import { Staff } from '../entities/Staff';
import { User } from '../entities/User';
import { isAuth } from '../middleware/isAuth';
import { MyContext } from '../types';
import { validateStaff } from './../utils/validateStaff';
import { FieldError } from './user';

@ObjectType()
class PaginatedStaff {
  @Field(() => [Staff])
  staffs: Staff[];
  @Field()
  hasMore: boolean;
}

@ObjectType()
class StaffResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Staff, { nullable: true })
  staff?: Staff;
}

@InputType()
export class StaffInput {
  @Field()
  name: string;
}

@Resolver(Staff)
export class StaffResolver {
  @FieldResolver(() => User)
  creator(@Root() staff: Staff, @Ctx() { userLoader }: MyContext) {
    return userLoader.load(staff.creatorId);
  }

  //+++++++++++++++++Get all Staff+++++++++++++++++//
  @Query(() => PaginatedStaff)
  async staffs(
    @Arg('limit', () => Int) limit: number,
    @Arg('cursor', () => String, { nullable: true }) cursor: string | null,
    @Ctx() { req }: MyContext,
  ): Promise<PaginatedStaff> {
    const realLimit = Math.min(50, limit);
    const reaLimitPlusOne = realLimit + 1;
    const userId = req.session.userId;
    const replacements: any[] = [reaLimitPlusOne];

    if (cursor) {
      replacements.push(new Date(parseInt(cursor)));
    }

    const staffs = await getConnection().query(
      `
    select s.*
    from staff s
    where "creatorId" = ${userId}
    ${cursor ? `where s."createdAt" < $2` : ''}
    order by s."createdAt" DESC
    limit $1
    `,
      replacements,
    );

    return {
      staffs: staffs.slice(0, realLimit),
      hasMore: staffs.length === reaLimitPlusOne,
    };
  }

  //+++++++++++++++++Get Staff+++++++++++++++++//
  @Query(() => Staff, { nullable: true })
  staff(@Arg('id', () => Int) id: number): Promise<Staff | undefined> {
    return Staff.findOne(id);
  }

  //+++++++++++++++++Create Staff+++++++++++++++++//
  @Mutation(() => StaffResponse)
  @UseMiddleware(isAuth)
  async createStaff(
    @Arg('input') input: StaffInput,
    @Ctx() { req }: MyContext,
  ): Promise<StaffResponse> {
    const errors = validateStaff(input);
    if (errors) {
      return { errors };
    }

    const staff = await Staff.create({
      name: input.name,
      creatorId: req.session.userId,
    }).save();

    return { staff };
  }

  //+++++++++++++++++Update Staff+++++++++++++++++//
  @Mutation(() => Staff, { nullable: true })
  @UseMiddleware(isAuth)
  async updateStaff(
    @Arg('id', () => Int) id: number,
    @Arg('name') name: string,

    @Ctx() { req }: MyContext,
  ): Promise<Staff | null> {
    const result = await getConnection()
      .createQueryBuilder()
      .update(Staff)
      .set({ name })
      .where('id = :id and "creatorId" = :creatorId', {
        id,
        creatorId: req.session.userId,
      })
      .returning('*')
      .execute();

    return result.raw[0];
  }

  //+++++++++++++++++Delete Staff+++++++++++++++++//
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteStaff(
    @Arg('id', () => Int) id: number,
    @Ctx() { req }: MyContext,
  ): Promise<boolean> {
    await Staff.delete({ id, creatorId: req.session.userId });
    return true;
  }
}
