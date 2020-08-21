import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Goal {
  @PrimaryKey()
  id!: number;

  @Property({ type: "date" })
  createdAt = new Date();

  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt = new Date();

  @Property({ type: "text" })
  month!: string;

  @Property({ type: "number" })
  goal!: number;
}