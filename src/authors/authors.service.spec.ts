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
    {
      id: 2,
      name: 'testAuthor2',
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

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create author', () => {
    const newAuthor = service.create(testAuthors[0]);
    console.log(newAuthor);
    expect(newAuthor).not.toBeNull();
    expect(newAuthor).toBeDefined();
    void expect(newAuthor).resolves.toHaveProperty('name', testAuthors[0].name);
  });

  it('should find all authors', () => {
    void service.create(testAuthors[0]);
    void service.create(testAuthors[1]);

    const data = service.findAll({ page: 1, size: 10 });
    expect(data).toBeDefined();
    expect(data).not.toBeNull();
    void expect(data).resolves.toEqual(testAuthors);
  });

  it('should find one author', () => {
    void service.create(testAuthors[0]);
    void service.create(testAuthors[1]);

    const data = service.findOne(1);
    expect(data).toBeDefined();
    expect(data).not.toBeNull();
    void expect(data).resolves.toEqual(testAuthors[0]);
  });

  it('should update author', () => {
    void service.create(testAuthors[0]);
    const data = service.update({ id: testAuthors[0].id, name: 'nameChanged' });

    expect(data).toBeDefined();
    expect(data).not.toBeNull();
    void expect(data).resolves.toHaveProperty('name', 'nameChanged');
  });

  it('should delete author', () => {
    void service.create(testAuthors[0]);
    void service.remove(testAuthors[0].id);

    const data = service.findAll({ page: 1, size: 10 });
    expect(data).toBeDefined();
    expect(data).not.toBeNull();
    void expect(data).resolves.toEqual([]);
  });
});
