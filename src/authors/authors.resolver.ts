import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Subscription,
} from '@nestjs/graphql';
import { AuthorsService } from './authors.service';
import { Author } from './entities/author.entity';
import { CreateAuthorInput } from './dto/create-author.input';
import { UpdateAuthorInput } from './dto/update-author.input';
import { PaginationInput } from '../common/interface/pagination/pagination.interface';
import { PaginationPipe } from '../common/pipe/pagination/pagination.pipe';
import { PubSubService } from '../common/service/pub-sub/pub-sub.service';
import { NotFoundException, UseInterceptors } from '@nestjs/common';
import { LoggingInterceptor } from '../common/interceptor/logging/logging.interceptor';
import { AuthorResult } from './entities/author-result.entity';
import { Message } from '../common/entity/message.entity';

@UseInterceptors(LoggingInterceptor)
@Resolver(() => Author)
export class AuthorsResolver {
  constructor(
    private readonly authorsService: AuthorsService,
    private readonly pubSub: PubSubService,
  ) { }

  @Mutation(() => Author)
  async createAuthor(
    @Args('createAuthorInput') createAuthorInput: CreateAuthorInput,
  ) {
    const newAuthor = await this.authorsService.create(createAuthorInput);
    this.pubSub.publish('authorAdded', { authorAdded: newAuthor });
    return newAuthor;
  }

  @Query(() => [Author], { name: 'authors' })
  findAll(
    @Args(
      'paginationInput',
      { defaultValue: { page: 1, size: 10 } },
      new PaginationPipe(),
    )
    paginationInput: PaginationInput,
    @Args('name', { nullable: true }) name?: string,
  ) {
    return this.authorsService.findAll(paginationInput, name);
  }

  @Query(() => AuthorResult, { name: 'author' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    try {
      return await this.authorsService.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return new Message({ message: 'author not found' });
      }
      throw error
    }
  }

  @Mutation(() => Author)
  updateAuthor(
    @Args('updateAuthorInput') updateAuthorInput: UpdateAuthorInput,
  ) {
    return this.authorsService.update(updateAuthorInput);
  }

  @Mutation(() => Message)
  async removeAuthor(@Args('id', { type: () => Int }) id: number) {
    try {
      await this.authorsService.remove(id)
      return new Message({ message: "author deleted" })
    } catch (error) {
      if (error instanceof NotFoundException) {
        return new Message({ message: 'author not found' });
      }
      throw error
    }
  }

  @Subscription(() => Author)
  authorAdded() {
    return this.pubSub.asyncIterableIterator('authorAdded');
  }
}
