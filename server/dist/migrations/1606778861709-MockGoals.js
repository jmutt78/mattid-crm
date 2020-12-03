"use strict";
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
exports.MockGoals1606778861709 = void 0;
class MockGoals1606778861709 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
        insert into goal ("monthGoalString", "monthGoal", date, "creatorId", "createdAt") values ('$138622.76', 130873, '2020-08-19 13:37:38', 1, '2020-02-11T20:59:52Z');
        insert into goal ("monthGoalString", "monthGoal", date, "creatorId", "createdAt") values ('$136804.20', 127307, '2020-09-23 08:49:05', 1, '2019-12-25T21:13:45Z');
        insert into goal ("monthGoalString", "monthGoal", date, "creatorId", "createdAt") values ('$113887.93', 147433, '2019-12-13 13:10:41', 1, '2020-11-06T08:44:54Z');
        insert into goal ("monthGoalString", "monthGoal", date, "creatorId", "createdAt") values ('$100107.39', 143470, '2019-12-20 20:49:39', 1, '2020-06-05T02:02:12Z');
        insert into goal ("monthGoalString", "monthGoal", date, "creatorId", "createdAt") values ('$140942.01', 138224, '2020-10-16 15:52:39', 1, '2019-12-11T07:14:19Z');
        insert into goal ("monthGoalString", "monthGoal", date, "creatorId", "createdAt") values ('$133238.12', 145310, '2020-08-18 23:32:14', 1, '2020-09-27T03:32:43Z');
        insert into goal ("monthGoalString", "monthGoal", date, "creatorId", "createdAt") values ('$101934.70', 124966, '2020-08-05 04:15:51', 1, '2020-02-16T23:35:04Z');
        insert into goal ("monthGoalString", "monthGoal", date, "creatorId", "createdAt") values ('$146793.07', 120001, '2020-04-20 23:39:44', 1, '2020-07-24T21:16:08Z');
        insert into goal ("monthGoalString", "monthGoal", date, "creatorId", "createdAt") values ('$109964.74', 101661, '2020-10-29 11:02:53', 1, '2020-02-02T18:41:26Z');
        insert into goal ("monthGoalString", "monthGoal", date, "creatorId", "createdAt") values ('$135689.93', 134231, '2020-08-11 18:11:30', 1, '2020-02-06T16:02:48Z');
        insert into goal ("monthGoalString", "monthGoal", date, "creatorId", "createdAt") values ('$129477.34', 145089, '2020-03-29 22:06:19', 1, '2020-03-19T11:21:42Z');
        insert into goal ("monthGoalString", "monthGoal", date, "creatorId", "createdAt") values ('$102889.96', 107702, '2020-01-05 21:49:52', 1, '2020-03-01T18:06:54Z');
        insert into goal ("monthGoalString", "monthGoal", date, "creatorId", "createdAt") values ('$104503.89', 123795, '2020-02-09 16:54:56', 1, '2020-01-22T03:57:11Z');
        insert into goal ("monthGoalString", "monthGoal", date, "creatorId", "createdAt") values ('$133471.94', 142396, '2020-09-30 09:36:16', 1, '2020-11-14T10:22:17Z');
        insert into goal ("monthGoalString", "monthGoal", date, "creatorId", "createdAt") values ('$109881.55', 126359, '2020-06-20 02:06:15', 1, '2020-03-28T16:10:06Z');
        insert into goal ("monthGoalString", "monthGoal", date, "creatorId", "createdAt") values ('$149001.32', 107905, '2020-03-08 18:26:38', 1, '2020-04-24T08:51:54Z');
        insert into goal ("monthGoalString", "monthGoal", date, "creatorId", "createdAt") values ('$144830.94', 140854, '2020-04-01 08:05:00', 1, '2020-07-26T15:22:36Z');
        insert into goal ("monthGoalString", "monthGoal", date, "creatorId", "createdAt") values ('$107257.06', 127664, '2020-02-29 06:10:55', 1, '2020-01-09T12:45:30Z');
        insert into goal ("monthGoalString", "monthGoal", date, "creatorId", "createdAt") values ('$110004.40', 122617, '2020-05-04 07:04:14', 1, '2020-04-05T02:34:43Z');
        insert into goal ("monthGoalString", "monthGoal", date, "creatorId", "createdAt") values ('$138304.34', 144298, '2020-02-05 21:00:17', 1, '2020-08-01T06:23:02Z');
        insert into goal ("monthGoalString", "monthGoal", date, "creatorId", "createdAt") values ('$147030.74', 117921, '2020-10-24 20:45:21', 1, '2020-10-16T10:50:02Z');
        insert into goal ("monthGoalString", "monthGoal", date, "creatorId", "createdAt") values ('$131261.09', 130995, '2020-10-01 00:59:54', 1, '2020-06-20T15:58:06Z');
        insert into goal ("monthGoalString", "monthGoal", date, "creatorId", "createdAt") values ('$118485.34', 145777, '2020-08-10 04:01:27', 1, '2020-04-18T09:15:34Z');
        insert into goal ("monthGoalString", "monthGoal", date, "creatorId", "createdAt") values ('$131619.50', 100547, '2020-04-14 21:52:20', 1, '2020-08-19T12:25:59Z');
        insert into goal ("monthGoalString", "monthGoal", date, "creatorId", "createdAt") values ('$117193.23', 117356, '2020-03-18 14:43:43', 1, '2020-08-31T19:36:28Z');
        insert into goal ("monthGoalString", "monthGoal", date, "creatorId", "createdAt") values ('$113849.11', 135567, '2020-06-04 18:32:44', 1, '2020-09-28T16:05:16Z');
        insert into goal ("monthGoalString", "monthGoal", date, "creatorId", "createdAt") values ('$128563.81', 133819, '2020-06-01 17:54:39', 1, '2020-10-14T23:07:56Z');
        insert into goal ("monthGoalString", "monthGoal", date, "creatorId", "createdAt") values ('$112406.37', 119796, '2020-08-23 20:35:48', 1, '2020-09-24T15:51:50Z');
        insert into goal ("monthGoalString", "monthGoal", date, "creatorId", "createdAt") values ('$112100.01', 141238, '2020-04-16 14:59:42', 1, '2020-03-26T05:45:25Z');
        insert into goal ("monthGoalString", "monthGoal", date, "creatorId", "createdAt") values ('$111386.63', 114059, '2020-08-29 00:34:33', 1, '2020-11-05T12:54:10Z');
            `);
        });
    }
    down(_) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.MockGoals1606778861709 = MockGoals1606778861709;
//# sourceMappingURL=1606778861709-MockGoals.js.map