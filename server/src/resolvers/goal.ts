import { Resolver, Query, Ctx, Arg, Mutation } from "type-graphql";
import { Goal } from "../entities/Goal";
import { MyContext } from "../types";


@Resolver()
export class GoalResolver {
  @Query(() => [Goal])
  goals(@Ctx() { em }: MyContext): Promise<Goal[]> {
    return em.find(Goal, {});
  }

  @Query(() => Goal, { nullable: true })
  goal(@Arg("id") id: number, @Ctx() { em }: MyContext): Promise<Goal | null> {
    return em.findOne(Goal, { id });
  }

  @Mutation(() => Goal)
  async createGoal(
    @Arg("title") title: string,
    @Ctx() { em }: MyContext
  ): Promise<Goal> {
    const goal = em.create(Goal, { title });
    await em.persistAndFlush(goal);
    return goal;
  }

  @Mutation(() => Goal, { nullable: true })
  async updateGoal(
    @Arg("id") id: number,
    @Arg("title", () => String, { nullable: true }) title: string,
    @Ctx() { em }: MyContext
  ): Promise<Goal | null> {
    const goal = await em.findOne(Goal, { id });
    if (!goal) {
      return null;
    }
    if (typeof title !== "undefined") {
      goal.title = title;
      await em.persistAndFlush(goal);
    }
    return goal;
  }

  @Mutation(() => Boolean)
  async deleteGoal(
    @Arg("id") id: number,
    @Ctx() { em }: MyContext
  ): Promise<boolean> {
    await em.nativeDelete(Goal, { id });
    return true;
  }
}