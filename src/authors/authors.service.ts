import { Injectable } from '@nestjs/common';
import { CreateAuthorInput } from './dto/create-author.input';
import { UpdateAuthorInput } from './dto/update-author.input';
import { PrismaService } from '../common/service/prisma/prisma.service';
import { PaginationInput } from '../common/interface/pagination/pagination.interface';

@Injectable()
export class AuthorsService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createAuthorInput: CreateAuthorInput) {
    return this.prismaService.author.create({
      data: createAuthorInput,
    });
  }

  findAll(pagination: PaginationInput, name?: string) {
    const { page, size } = pagination;
    return this.prismaService.author.findMany({
      where: name ? { name: { contains: name } } : undefined,
      skip: page,
      take: size,
    });
  }

  findOne(id: number) {
    return this.prismaService.author.findUnique({
      where: { id },
    });
  }

  update(updateAuthorInput: UpdateAuthorInput) {
    return this.prismaService.author.update({
      where: { id: updateAuthorInput.id },
      data: {
        ...updateAuthorInput,
        updated_at: new Date(),
      },
    });
  }

  async remove(id: number) {
    await this.prismaService.author.delete({
      where: { id },
    });
  }
}
