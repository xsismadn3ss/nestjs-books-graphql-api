import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { PrismaModule } from '../common/service/prisma/prisma.module';

describe('BooksService', () => {
  let service: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [BooksService],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
