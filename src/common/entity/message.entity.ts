import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Message {
  @Field(() => String, { description: 'mensaje de error' })
  message: string;

  constructor({ message }: { message: string }) {
    this.message = message;
  }
}
