import { Module } from '@nestjs/common';
import { BooksResolver } from './resolver';
import { BooksService } from './service';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [BooksResolver, BooksService, PrismaService],
})
export class BooksModule {}
