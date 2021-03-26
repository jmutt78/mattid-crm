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
import { StoreGoal } from './../entities/StoreGoals';
import { getConnection } from 'typeorm';
import { v4 } from 'uuid';
import { Staff } from '../entities/Staff';
import { User } from '../entities/User';
import { isAuth } from '../middleware/isAuth';
import { MyContext } from '../types';
import { FieldError } from './user';

@Resolver(StoreGoal)
export class StoreGoalResolver {
  @FieldResolver(() => User)
  creator(@Root() storeGoal: Staff, @Ctx() { userLoader }: MyContext) {
    return userLoader.load(storeGoal.creatorId);
  }
}
