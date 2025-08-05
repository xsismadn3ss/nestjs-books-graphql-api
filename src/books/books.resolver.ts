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
import { UseInterceptors } from '@nestjs/common';
import { LoggingInterceptor } from '../common/interceptor/logging/logging.interceptor';

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

  @Query(() => Book, { name: 'book' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.booksService.findOne(id);
  }

  @Mutation(() => Book)
  updateBook(@Args('updateBookInput') updateBookInput: UpdateBookInput) {
    return this.booksService.update(updateBookInput);
  }

  @Mutation(() => Book)
  removeBook(@Args('id', { type: () => Int }) id: number) {
    return this.booksService.remove(id);
  }

  @Subscription(() => Book)
  bookAdded() {
    return this.pubSub.asyncIterableIterator('bookAdded');
  }
}
