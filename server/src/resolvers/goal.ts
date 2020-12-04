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

    const replacements: any[] = [reaLimitPlusOne];

    if (cursor) {
      replacements.push(new Date(parseInt(cursor)));
    }

    //SQL query for goals
    const goals = await getConnection().query(
      `
    select p.*,
    json_build_object(
      'id', u.id,
      'username', u.username,
      'email', u.email,
      'createdAt', u."createdAt",
      'updatedAt', u."updatedAt"
      ) creator
    from goal p
    inner join public.user u on u.id = p."creatorId"
    ${cursor ? `where p."createdAt" < $2` : ""}
    order by p."createdAt" DESC
    limit $1
    `,
      replacements
    );

    // const qb = getConnection()
    //   .getRepository(Goal)
    //   .createQueryBuilder("p")
    //   .innerJoinAndSelect("p.creator", "u", 'u.id = p."creatorId"')
    //   .orderBy('p."createdAt"', "DESC")
    //   .take(reaLimitPlusOne);

    // if (cursor) {
    //   qb.where('p."createdAt" < :cursor', {
    //     cursor: new Date(parseInt(cursor)),
    //   });
    // }

    // const goals = await qb.getMany();
    console.log("goals: ", goals);

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