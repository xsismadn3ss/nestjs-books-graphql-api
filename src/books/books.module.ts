import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksResolver } from './books.resolver';
import { PrismaModule } from '../common/service/prisma/prisma.module';
import { PubSubModule } from 'src/common/service/pub-sub/pub-sub.module';

@Module({
  imports: [PrismaModule, PubSubModule],
  providers: [BooksResolver, BooksService],
})
export class BooksModule {}
