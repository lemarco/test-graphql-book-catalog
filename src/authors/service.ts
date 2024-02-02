import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Author, Prisma } from '@prisma/client';

@Injectable()
export class AuthorsService {
  constructor(private readonly prisma: PrismaService) {}

  async findOneById(id: string): Promise<Author> {
    try {
      return this.prisma.author.findUnique({ where: { id } });
    } catch (e) {
      return null;
    }
  }

  async findMany({
    minNumberOfBooks,
    maxNumberOfBooks,
  }: {
    minNumberOfBooks?: number;
    maxNumberOfBooks?: number;
  }): Promise<Author[]> {
    const where: any = {};

    return this.prisma.$queryRaw`
            SELECT "Author"."id", "Author"."firstName", "Author"."lastName"
            FROM "Author" 
            JOIN "BookAuthor" ON "Author".id = "BookAuthor".author_id 
            JOIN "Book" ON "BookAuthor".book_id = "Book".id 
            GROUP BY "Author".id 
            HAVING COUNT("Book".id) >= ${minNumberOfBooks} 
               AND COUNT("Book".id) <= ${maxNumberOfBooks};
    `;
  }

  async create(author: Prisma.AuthorCreateInput): Promise<Author> {
    return this.prisma.author.create({ data: author });
  }
  async deleteAuthor(id: string): Promise<number> {
    try {
      const deletedAuthor = await this.prisma.author.delete({
        where: { id },
      });

      return deletedAuthor ? 1 : 0;
    } catch (e) {
      return 0;
    }
  }
  async deleteAuthorWithBooks(id: string): Promise<number> {
    try {
      const deletedAuthorWithBooks = await this.prisma.$transaction(
        async (prisma) => {
          const deletedAuthor = await prisma.author.delete({
            where: { id },
          });

          if (!deletedAuthor) {
            return 0; // If the author was not found and deleted, return 0
          }

          const deletedBooks = await prisma.book.deleteMany({
            where: {
              authors: {
                every: {
                  id: deletedAuthor.id,
                },
              },
            },
          });

          await prisma.book.deleteMany({
            where: {
              authors: {
                some: {
                  id: deletedAuthor.id,
                },
              },
            },
          });
          const deletedBooksWithoutAuthors = await prisma.book.deleteMany({
            where: {
              authors: { none: {} },
            },
          });
          return deletedBooks.count + deletedBooksWithoutAuthors.count;
        },
      );

      return deletedAuthorWithBooks;
    } catch (e) {
      return 0;
    }
  }
}
