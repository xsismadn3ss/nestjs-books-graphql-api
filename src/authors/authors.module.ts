import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsResolver } from './authors.resolver';
import { PrismaModule } from '../common/service/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [AuthorsResolver, AuthorsService],
})
export class AuthorsModule {}
