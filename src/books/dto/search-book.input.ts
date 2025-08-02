import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SearchBookInput {
  @Field(() => String, { description: 'nombre del libro', nullable: true })
  name?: string;

  @Field(() => String, { nullable: true, description: 'descripcion del libro' })
  description?: string;

  @Field(() => [String], {
    description: 'nombre de los autores',
    nullable: true,
  })
  authors: string[];
}
