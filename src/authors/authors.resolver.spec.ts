import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsResolver } from './authors.resolver';
import { AuthorsService } from './authors.service';
import { PrismaModule } from '../common/service/prisma/prisma.module';
import { PubSubModule } from '../common/service/pub-sub/pub-sub.module';

describe('AuthorsResolver', () => {
  let resolver: AuthorsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthorsResolver, AuthorsService],
      imports: [PrismaModule, PubSubModule],
    }).compile();

    resolver = module.get<AuthorsResolver>(AuthorsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
