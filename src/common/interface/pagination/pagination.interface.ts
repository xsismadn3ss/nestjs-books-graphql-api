import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class PaginationInput {
  @Field(() => Int, { description: 'pagina actual', defaultValue: 1 })
  page: number = 1;

  @Field(() => Int, {
    description: 'cantidad de registros por pagina',
    defaultValue: 10,
  })
  size: number = 10;
}
