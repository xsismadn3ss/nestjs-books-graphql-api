import { CreateAuthorInput } from './create-author.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAuthorInput extends PartialType(CreateAuthorInput) {
  @Field(() => Int, { description: 'id del author' })
  id: number;

  @Field(() => String, { description: 'nombre del author' })
  name: string;
}
