import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksResolver } from './books.resolver';
import { PrismaModule } from '../common/service/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [BooksResolver, BooksService],
})
export class BooksModule {}
