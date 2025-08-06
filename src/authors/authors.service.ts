import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthorInput } from './dto/create-author.input';
import { UpdateAuthorInput } from './dto/update-author.input';
import { PrismaService } from '../common/service/prisma/prisma.service';
import { PaginationInput } from '../common/interface/pagination/pagination.interface';
import { Author } from './entities/author.entity';
import { IAuthorsService } from './authors.interface';

@Injectable()
export class AuthorsService implements IAuthorsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createAuthorInput: CreateAuthorInput): Promise<Author> {
    const data: Author = await this.prismaService.author.create({
      data: createAuthorInput,
    });
    return new Author(data);
  }

  findAll(pagination: PaginationInput, name?: string): Promise<Author[]> {
    const { page, size } = pagination;
    return this.prismaService.author.findMany({
      where: name ? { name: { contains: name } } : undefined,
      skip: page,
      take: size,
    });
  }

  async findOne(id: number): Promise<Author> {
    const data: Author | null = await this.prismaService.author.findUnique({
      where: { id },
    });
    if (data === null) {
      throw new NotFoundException('author not found');
    }
    return new Author(data);
  }

  async update(updateAuthorInput: UpdateAuthorInput): Promise<Author> {
    return this.prismaService.author.update({
      where: { id: updateAuthorInput.id },
      data: {
        ...updateAuthorInput,
        updated_at: new Date(),
      },
    });
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.prismaService.author.delete({
      where: { id },
    });
  }
}
