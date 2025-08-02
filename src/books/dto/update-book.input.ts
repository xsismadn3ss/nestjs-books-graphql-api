import { CreateBookInput } from './create-book.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsPositive } from 'class-validator';

@InputType()
export class UpdateBookInput extends PartialType(CreateBookInput) {
  @Field(() => Int, { description: 'id del libro' })
  @IsPositive()
  id: number;

  @Field(() => String, { description: 'nombre del libro' })
  name?: string;

  @Field(() => String, { description: 'descripción del libro' })
  description?: string;

  @Field(() => [Int], { description: 'id de los autores' })
  authors?: number[];
}
