import { Field, Float, InputType } from '@nestjs/graphql';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

@InputType()
export class CreateOrderInput {
  @Field()
  @IsNumber()
  @IsPositive()
  userId: number;

  @Field(() => Float)
  @IsNumber()
  total: number;

  @Field(() => [String])
  @IsArray()
  @IsString({ each: true })
  items: string[];

  @Field({ defaultValue: 'PENDING' })
  @IsOptional()
  @IsString()
  status?: string;
}
