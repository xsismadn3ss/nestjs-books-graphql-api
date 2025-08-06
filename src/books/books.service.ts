import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { PrismaService } from '../common/service/prisma/prisma.service';
import { PaginationInput } from '../common/interface/pagination/pagination.interface';
import { SearchBookInput } from './dto/search-book.input';
import { Book } from './entities/book.entity';
import { IBooksService } from './books.interface';

@Injectable()
export class BooksService implements IBooksService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createBookInput: CreateBookInput) {
    const { name, description, authors } = createBookInput;

    return this.prismaService.book.create({
      data: {
        name: name,
        description: description,
        authors: { connect: authors?.map((id) => ({ id })) ?? [] },
      },
      include: {
        authors: true,
      },
    }) as Promise<Book>;
  }

  async findAll(
    pagination: PaginationInput,
    searchBookInput?: SearchBookInput,
  ) {
    const { page, size } = pagination;
    const conditions: any = {};

    if (searchBookInput) {
      const { name, description, authors } = searchBookInput;

      if (name) {
        conditions.name = { contains: name };
      }
      if (description) {
        conditions.description = { contains: description };
      }
      if (authors) {
        conditions.authors = {
          some: {
            OR: authors.map((authorName) => ({
              name: {
                contains: authorName,
              },
            })),
          },
        };
      }
    }

    const data = await this.prismaService.book.findMany({
      where: {
        ...conditions,
      },
      skip: page,
      take: size,
      include: { authors: true },
    });
    return data as Book[];
  }

  async findOne(id: number) {
    const data = await this.prismaService.book.findUnique({
      where: {
        id,
      },
      include: { authors: true },
    });
    if (data === null || data === undefined) {
      throw new NotFoundException('El libro no existe');
    }
    return data as Book;
  }

  update(updateBookInput: UpdateBookInput) {
    const { id, name, description, authors } = updateBookInput;
    return this.prismaService.book.update({
      data: {
        name: name ?? undefined,
        description: description ?? undefined,
        authors: { connect: authors?.map((id) => ({ id })) ?? [] },
      },
      where: { id },
      include: { authors: true },
    }) as Promise<Book>;
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prismaService.book.delete({
      where: { id },
    });
  }
}
