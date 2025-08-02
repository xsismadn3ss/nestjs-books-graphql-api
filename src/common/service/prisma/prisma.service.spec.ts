import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  let service: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should connect db', () => {
    const promise = service.$connect();
    expect(promise).toBeDefined();
  });

  it('should disconnect db', () => {
    const promise = service.$disconnect();
    expect(promise).toBeDefined();
  });
});
