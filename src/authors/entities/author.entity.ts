import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Author {
  @Field(() => Int, { description: 'id del author' })
  id: number;

  @Field(() => String, { description: 'nombre del author' })
  name: string;

  @Field(() => Date, { description: 'fecha de creacion del author' })
  created_at: Date;

  @Field(() => Date, { description: 'fecha de actualizacion del author' })
  updated_at: Date;
}
