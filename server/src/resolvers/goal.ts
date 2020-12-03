import {
  Resolver,
  Query,
  Arg,
  Mutation,
  InputType,
  Field,
  Ctx,
  UseMiddleware,
  Int,
  ObjectType
} from "type-graphql";
import { Goal } from "../entities/Goal";
import { MyContext } from "../types";
import { isAuth } from "../middleware/isAuth";
import { getConnection } from "typeorm";

@InputType()
class GoalInput {
  @Field()
  monthGoalString: string;

}

@ObjectType()
class PaginatedGoals {
  @Field(() => [Goal])
  goals: Goal[];
  @Field()
  hasMore: boolean;
}

@Resolver()
export class GoalResolver {
  @Query(() => PaginatedGoals)
  async goals(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null
  ): Promise<PaginatedGoals> {
    // 20 -> 21
    const realLimit = Math.min(50, limit);
    const reaLimitPlusOne = realLimit + 1;
    const qb = getConnection()
      .getRepository(Goal)
      .createQueryBuilder("p")
      .orderBy('"createdAt"', "DESC")
      .take(reaLimitPlusOne);

    if (cursor) {
      qb.where('"createdAt" < :cursor', {
        cursor: new Date(parseInt(cursor)),
      });
    }

    const goals = await qb.getMany();

    return {
      goals: goals.slice(0, realLimit),
      hasMore: goals.length === reaLimitPlusOne,
    };
  }

  @Mutation(() => Goal)
  @UseMiddleware(isAuth)
  async createGoal(
    @Arg("input") input: GoalInput,
    @Ctx() { req }: MyContext
  ): Promise<Goal> {
    return Goal.create({
      ...input,
      creatorId: req.session.userId,
    }).save();
  }

  @Mutation(() => Goal, { nullable: true })
  async updateGoal(
    @Arg("id") id: number,
    @Arg("monthGoalString", () => String, { nullable: true }) monthGoalString: string
  ): Promise<Goal | null> {
    const goal = await Goal.findOne(id);
    if (!goal) {
      return null;
    }
    if (typeof monthGoalString !== "undefined") {
      await Goal.update({ id }, { monthGoalString });
    }
    return goal;
  }

  @Mutation(() => Boolean)
  async deleteGoal(@Arg("id") id: number): Promise<boolean> {
    await Goal.delete(id);
    return true;
  }
}