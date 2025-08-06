import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsService } from './authors.service';
import { PrismaModule } from '../common/service/prisma/prisma.module';

describe('AuthorsService', () => {
  let service: AuthorsService;

  const testAuthors = [
    {
      id: 1,
      name: 'testAuthor',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [AuthorsService],
    }).compile();

    service = module.get<AuthorsService>(AuthorsService);
  });

  it('should be defined', async () => {
    expect(service).toBeDefined();
  });

  it('should create author', async () => {
    const newAuthor = await service.create(testAuthors[0]);

    expect(newAuthor).not.toBeNull();
    expect(newAuthor).toBeDefined();
    expect(newAuthor).toEqual(testAuthors[0]);
  });

  it('should find all authors', async () => {
    const data = await service.findAll({ page: 1, size: 10 });
    expect(data).toBeDefined();
  });

  it('should find author', async () => {
    const data = await service.findOne(1);

    expect(data).toBeDefined();
    expect(data).toEqual(testAuthors[0]);
  });

  it('should update author', async () => {
    const updatedAuthor = { id: testAuthors[0].id, name: 'nameChanged' };
    const data = await service.update(updatedAuthor);

    expect(data).toBeDefined();
    expect(data).not.toBeNull();
    expect(data.name).toBe('nameChanged');
  });

  it('should delete author', async () => {
    await service.remove(testAuthors[0].id);
    const data = await service.findAll({ page: 1, size: 10 });
    expect(data).toBeDefined();
    expect(data).toEqual([]);
  });
});
