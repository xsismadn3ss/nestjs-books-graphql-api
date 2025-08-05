import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsResolver } from './authors.resolver';
import { PrismaModule } from '../common/service/prisma/prisma.module';
import { PubSub } from 'graphql-subscriptions';

@Module({
  imports: [PrismaModule],
  providers: [AuthorsResolver, AuthorsService, PubSub],
})
export class AuthorsModule {}
