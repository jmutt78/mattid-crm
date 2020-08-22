  
import { Goal } from "./entities/Goal";
import { __prod__ } from "./constants";
import { MikroORM } from "@mikro-orm/core";
import path from "path";

export default {
  migrations: {
    path: path.join(__dirname, "./migrations"),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  entities: [Goal],
  dbName: "mattid",
  user: 'justinm',
  password: 'Deeder1432!',
  type: "postgresql",
  debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];