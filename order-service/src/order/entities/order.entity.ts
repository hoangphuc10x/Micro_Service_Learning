import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ValueTransformer,
} from 'typeorm';

const decimalTransformer: ValueTransformer = {
  to: (value?: number) => value,
  from: (value?: string) =>
    value === null || value === undefined ? null : Number(value),
};

@ObjectType()
@Entity({ name: 'orders' })
export class Order {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  userId: number;

  @Field(() => Float)
  @Column('decimal', {
    precision: 10,
    scale: 2,
    transformer: decimalTransformer,
  })
  total: number;

  @Field(() => [String])
  @Column('jsonb', { default: () => "'[]'::jsonb" })
  items: string[];

  @Field()
  @Column({ default: 'PENDING' })
  status: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;
}
