import {
  Resolver,
  Query,
  Arg,
  Mutation,
  InputType,
  Field,
  Ctx,
  UseMiddleware,
} from "type-graphql";
import { Goal } from "../entities/Goal";
import { MyContext } from "../types";
import { isAuth } from "../middleware/isAuth";

@InputType()
class GoalInput {
  @Field()
  monthGoalString: string;

}

@Resolver()
export class GoalResolver {
  @Query(() => [Goal])
  async goals(): Promise<Goal[]> {
    return Goal.find();
  }

  @Query(() => Goal, { nullable: true })
  goal(@Arg("id") id: number): Promise<Goal | undefined> {
    return Goal.findOne(id);
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