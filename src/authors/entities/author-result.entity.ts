import { createUnionType } from '@nestjs/graphql';
import { Author } from './author.entity';
import { Message } from '../../common/entity/message.entity';

export const AuthorResult = createUnionType({
  name: 'AuthorResult',
  types() {
    return [Author, Message];
  },
  resolveType(value) {
    if (value instanceof Author) {
      return Author;
    }
    if (value instanceof Message) {
      return Message;
    }
  },
});
