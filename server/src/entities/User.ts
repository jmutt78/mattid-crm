import { StoreGoal } from './StoreGoals';
import { ObjectType, Field } from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { Staff } from './Staff';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  role!: UserRole;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Column({ nullable: true })
  password!: string;

  //Oath info
  @Column('text', { nullable: true })
  googleId: string | null;

  @Column('text', { nullable: true })
  facebookId: string | null;

  @Column('text', { nullable: true })
  linkedInId: string | null;

  //Stripe and memebership
  @Field()
  @Column('text', { default: 'free-trial' })
  customerType!: string;

  @Column('text', { nullable: true })
  stripeId: string;

  @Column('text', { nullable: true })
  stripeSubscriptionId: string;

  @Field()
  @Column({ nullable: true, default: '' })
  ccLast4: string;

  //Connections
  @OneToMany(() => Staff, (staff) => staff.creator)
  staffs: Staff[];

  @OneToMany(() => StoreGoal, (storeGoal) => storeGoal.user)
  storeGoals: StoreGoal[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
