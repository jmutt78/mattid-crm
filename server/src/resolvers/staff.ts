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
} from 'type-graphql';
import { getConnection } from 'typeorm';
import { v4 } from 'uuid';
import { Staff } from '../entities/Staff';
import { User } from '../entities/User';
import { isAuth } from '../middleware/isAuth';
import { MyContext } from '../types';
import { SubInput } from './SubInput';
import { FieldError } from './user';

// @ObjectType()
// class PaginatedSubs {
//   @Field(() => [Sub])
//   subs: Sub[];
//   @Field()
//   hasMore: boolean;
// }

// @ObjectType()
// class SubResponse {
//   @Field(() => [FieldError], { nullable: true })
//   errors?: FieldError[];

//   @Field(() => Sub, { nullable: true })
//   sub?: Sub;
// }

@Resolver(Staff)
export class StaffResolver {
  @FieldResolver(() => User)
  creator(@Root() staff: Staff, @Ctx() { userLoader }: MyContext) {
    return userLoader.load(staff.creatorId);
  }
}
