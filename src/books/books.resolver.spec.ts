import { Test, TestingModule } from '@nestjs/testing';
import { BooksResolver } from './books.resolver';
import { BooksService } from './books.service';
import { PubSubModule } from '../common/service/pub-sub/pub-sub.module';
import { PrismaModule } from '../common/service/prisma/prisma.module';

describe('BooksResolver', () => {
  let resolver: BooksResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksResolver, BooksService],
      imports:[PubSubModule, PrismaModule],
    }).compile();

    resolver = module.get<BooksResolver>(BooksResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
