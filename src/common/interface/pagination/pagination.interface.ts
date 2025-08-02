import { Field, InputType, Int } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

@InputType()
export class PaginationInput {
  @Field(() => Int, { description: 'pagina actual', defaultValue: 1 })
  @Min(1)
  page: number = 1;

  @Field(() => Int, {
    description: 'cantidad de registros por pagina',
    defaultValue: 10,
  })
  @Min(1)
  @Max(100)
  size: number = 10;
}
