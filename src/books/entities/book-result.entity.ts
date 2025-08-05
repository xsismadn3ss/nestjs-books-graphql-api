import { createUnionType } from '@nestjs/graphql';
import { Book } from './book.entity';
import { Message } from '../../common/entity/message.entity';

export const BookResult = createUnionType({
  name: 'BookResult',
  types() {
    return [Book, Message];
  },
  resolveType(value) {
    if (value instanceof Book) {
      return Book;
    }
    if (value instanceof Message) {
      return Message;
    }
  },
});
