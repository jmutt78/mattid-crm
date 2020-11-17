
import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { Goal } from "../entities/Goal";

@Resolver()
export class GoalResolver {
  @Query(() => [Goal])
  async posts(): Promise<Goal[]> {
    return Goal.find();
  }

  @Query(() => Goal, { nullable: true })
  post(@Arg("id") id: number): Promise<Goal | undefined> {
    return Goal.findOne(id);
  }

  @Mutation(() => Goal)
  async createGoal(@Arg("title") title: string): Promise<Goal> {
    return Goal.create({ title }).save();
  }

  @Mutation(() => Goal, { nullable: true })
  async updateGoal(
    @Arg("id") id: number,
    @Arg("title", () => String, { nullable: true }) title: string
  ): Promise<Goal | null> {
    const post = await Goal.findOne(id);
    if (!post) {
      return null;
    }
    if (typeof title !== "undefined") {
      await Goal.update({ id }, { title });
    }
    return post;
  }

  @Mutation(() => Boolean)
  async deleteGoal(@Arg("id") id: number): Promise<boolean> {
    await Goal.delete(id);
    return true;
  }
}