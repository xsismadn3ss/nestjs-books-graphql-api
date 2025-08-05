import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Author } from '../../authors/entities/author.entity';

@ObjectType()
export class Book {
  @Field(() => Int, { description: 'id del libro' })
  id: number;

  @Field(() => String, { description: 'nombre del libro' })
  name: string;

  @Field(() => String, { description: 'descripción del libro' })
  description: string;

  @Field(() => Date, { description: 'fecha de creación del libro' })
  created_at: Date;
  @Field(() => Date, { description: 'facha de actualización del libro' })
  updated_at: Date;

  @Field(() => [Author], { description: 'autores del libro' })
  authors: Author[];

  constructor({
    id,
    name,
    description,
    created_at,
    updated_at,
    authors,
  }: Book) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.authors = authors;
  }
}
