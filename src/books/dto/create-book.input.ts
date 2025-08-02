import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateBookInput {
  @Field(() => String, { description: 'nombre del libro' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(150)
  name: string;

  @Field(() => String, { description: 'descripción del libro' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(500)
  description: string;

  @Field(() => [Int], { description: 'id de los autores', nullable: true })
  authors?: number[];
}
