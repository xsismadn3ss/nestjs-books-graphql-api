import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Subscription,
} from '@nestjs/graphql';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { PaginationPipe } from '../common/pipe/pagination/pagination.pipe';
import { PaginationInput } from '../common/interface/pagination/pagination.interface';
import { SearchBookInput } from './dto/search-book.input';
import { PubSubService } from '../common/service/pub-sub/pub-sub.service';
import { NotFoundException, UseInterceptors } from '@nestjs/common';
import { LoggingInterceptor } from '../common/interceptor/logging/logging.interceptor';
import { BookResult } from './entities/book-result.entity';
import { Message } from '../common/entity/message.entity';

@UseInterceptors(LoggingInterceptor)
@Resolver(() => Book)
export class BooksResolver {
  constructor(
    private readonly booksService: BooksService,
    private readonly pubSub: PubSubService,
  ) {}

  @Mutation(() => Book)
  createBook(@Args('createBookInput') createBookInput: CreateBookInput) {
    const newBook = this.booksService.create(createBookInput);
    this.pubSub.publish('bookAdded', { bookAdded: newBook });
    return newBook;
  }

  @Query(() => [Book], { name: 'books' })
  findAll(
    @Args(
      'paginationInput',
      { defaultValue: { page: 1, size: 10 } },
      new PaginationPipe(),
    )
    paginationInput: PaginationInput,
    @Args('searchBookInput', { nullable: true })
    searchBookInput: SearchBookInput,
  ) {
    return this.booksService.findAll(paginationInput, searchBookInput);
  }

  @Query(() => BookResult, { name: 'book' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    try {
      const data = await this.booksService.findOne(id);
      return new Book(data);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return new Message({ message: 'book not found' });
      }
      throw error;
    }
  }

  @Mutation(() => Book)
  updateBook(@Args('updateBookInput') updateBookInput: UpdateBookInput) {
    return this.booksService.update(updateBookInput);
  }

  @Mutation(() => Message)
  async removeBook(@Args('id', { type: () => Int }) id: number) {
    try {
      await this.booksService.remove(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return new Message({ message: 'book not found' });
      }
      throw error;
    }
  }

  @Subscription(() => Book)
  bookAdded() {
    return this.pubSub.asyncIterableIterator('bookAdded');
  }
}
