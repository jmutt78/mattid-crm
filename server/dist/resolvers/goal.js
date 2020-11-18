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
let GoalResolver = class GoalResolver {
    goals() {
        return __awaiter(this, void 0, void 0, function* () {
            return Goal_1.Goal.find();
        });
    }
    goal(id) {
        return Goal_1.Goal.findOne(id);
    }
    createGoal(title) {
        return __awaiter(this, void 0, void 0, function* () {
            return Goal_1.Goal.create({ title }).save();
        });
    }
    updateGoal(id, title) {
        return __awaiter(this, void 0, void 0, function* () {
            const goal = yield Goal_1.Goal.findOne(id);
            if (!goal) {
                return null;
            }
            if (typeof title !== "undefined") {
                yield Goal_1.Goal.update({ id }, { title });
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
    type_graphql_1.Query(() => [Goal_1.Goal]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GoalResolver.prototype, "goals", null);
__decorate([
    type_graphql_1.Query(() => Goal_1.Goal, { nullable: true }),
    __param(0, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GoalResolver.prototype, "goal", null);
__decorate([
    type_graphql_1.Mutation(() => Goal_1.Goal),
    __param(0, type_graphql_1.Arg("title")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GoalResolver.prototype, "createGoal", null);
__decorate([
    type_graphql_1.Mutation(() => Goal_1.Goal, { nullable: true }),
    __param(0, type_graphql_1.Arg("id")),
    __param(1, type_graphql_1.Arg("title", () => String, { nullable: true })),
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