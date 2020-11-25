import {
  Resolver,
  Query,
  Arg,
  Mutation,
  InputType,
  Field,
  Ctx,
  UseMiddleware,
  Int
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

@Resolver()
export class GoalResolver {
  @Query(() => [Goal])
  async goals(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null
  ): Promise<Goal[]> {
    const realLimit = Math.min(50, limit);
    const qb = getConnection()
      .getRepository(Goal)
      .createQueryBuilder("g")
      .orderBy('"createdAt"', "DESC")
      .take(realLimit);

    if (cursor) {
      qb.where('"createdAt" < :cursor', {
        cursor: new Date(parseInt(cursor)),
      });
    }

    return qb.getMany();
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