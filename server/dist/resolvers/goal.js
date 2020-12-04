"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoalResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Goal_1 = require("../entities/Goal");
const isAuth_1 = require("../middleware/isAuth");
const typeorm_1 = require("typeorm");
let GoalInput = class GoalInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], GoalInput.prototype, "monthGoalString", void 0);
GoalInput = __decorate([
    type_graphql_1.InputType()
], GoalInput);
let PaginatedGoals = class PaginatedGoals {
};
__decorate([
    type_graphql_1.Field(() => [Goal_1.Goal]),
    __metadata("design:type", Array)
], PaginatedGoals.prototype, "goals", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], PaginatedGoals.prototype, "hasMore", void 0);
PaginatedGoals = __decorate([
    type_graphql_1.ObjectType()
], PaginatedGoals);
let GoalResolver = class GoalResolver {
    goals(limit, cursor) {
        return __awaiter(this, void 0, void 0, function* () {
            const realLimit = Math.min(50, limit);
            const reaLimitPlusOne = realLimit + 1;
            const replacements = [reaLimitPlusOne];
            if (cursor) {
                replacements.push(new Date(parseInt(cursor)));
            }
            const goals = yield typeorm_1.getConnection().query(`
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
    `, replacements);
            console.log("goals: ", goals);
            return {
                goals: goals.slice(0, realLimit),
                hasMore: goals.length === reaLimitPlusOne,
            };
        });
    }
    createGoal(input, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            return Goal_1.Goal.create(Object.assign(Object.assign({}, input), { creatorId: req.session.userId })).save();
        });
    }
    updateGoal(id, monthGoalString) {
        return __awaiter(this, void 0, void 0, function* () {
            const goal = yield Goal_1.Goal.findOne(id);
            if (!goal) {
                return null;
            }
            if (typeof monthGoalString !== "undefined") {
                yield Goal_1.Goal.update({ id }, { monthGoalString });
            }
            return goal;
        });
    }
    deleteGoal(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Goal_1.Goal.delete(id);
            return true;
        });
    }
};
__decorate([
    type_graphql_1.Query(() => PaginatedGoals),
    __param(0, type_graphql_1.Arg("limit", () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Arg("cursor", () => String, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], GoalResolver.prototype, "goals", null);
__decorate([
    type_graphql_1.Mutation(() => Goal_1.Goal),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg("input")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GoalInput, Object]),
    __metadata("design:returntype", Promise)
], GoalResolver.prototype, "createGoal", null);
__decorate([
    type_graphql_1.Mutation(() => Goal_1.Goal, { nullable: true }),
    __param(0, type_graphql_1.Arg("id")),
    __param(1, type_graphql_1.Arg("monthGoalString", () => String, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], GoalResolver.prototype, "updateGoal", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GoalResolver.prototype, "deleteGoal", null);
GoalResolver = __decorate([
    type_graphql_1.Resolver()
], GoalResolver);
exports.GoalResolver = GoalResolver;
//# sourceMappingURL=goal.js.map