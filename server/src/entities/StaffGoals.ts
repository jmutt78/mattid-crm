import { ObjectType, Field } from 'type-graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Staff } from './Staff';

@ObjectType()
@Entity()
export class StaffGoals extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @CreateDateColumn()
  date: Date;

  @Field()
  @Column()
  goal!: string;

  @Field()
  @Column()
  creatorId: number;

  @ManyToOne(() => Staff, (staff) => staff.staffGoals)
  staff: Staff;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
