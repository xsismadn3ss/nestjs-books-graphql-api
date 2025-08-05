import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsResolver } from './authors.resolver';
import { PrismaModule } from '../common/service/prisma/prisma.module';
import { PubSubModule } from 'src/common/service/pub-sub/pub-sub.module';

@Module({
  imports: [PrismaModule, PubSubModule],
  providers: [AuthorsResolver, AuthorsService],
})
export class AuthorsModule {}
