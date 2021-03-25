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
import { User } from './User';

@ObjectType()
@Entity()
export class Staff extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  email!: string;

  @Field()
  @Column()
  unsubscribeToken!: string;

  @Field()
  @Column()
  subscribed!: boolean;

  @Field()
  @Column()
  creatorId: number;

  @Field()
  @Column()
  frequency: number;

  @Field()
  @ManyToOne(() => User, (user) => user.staffs)
  creator: User;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
