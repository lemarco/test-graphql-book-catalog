import { Module } from '@nestjs/common';
import { AuthorsResolver } from './resolver';
import { AuthorsService } from './service';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [AuthorsResolver, AuthorsService, PrismaService],
})
export class AuthorsModule {}
