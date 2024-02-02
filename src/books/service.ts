import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Book } from '@prisma/client';
import { BookInput } from './dto/book.input';
import { Book as BookDto } from './dto/book.dto';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  async findOneById(id: string): Promise<Book> {
    try {
      return this.prisma.book.findUnique({ where: { id } });
    } catch (e) {
      return null;
    }
  }

  async getAllBooks(): Promise<BookDto[]> {
    return this.prisma.book.findMany({
      include: {
        authors: true,
      },
    }) as Promise<BookDto[]>;
  }

  async getBooksByTitle(title: string): Promise<BookDto[]> {
    return this.prisma.book.findMany({
      include: {
        authors: true,
      },
      where: {
        title: {
          contains: title.replace('%', ''),
          mode: 'insensitive',
        },
      },
    }) as Promise<BookDto[]>;
  }

  async getBooksByAuthor(id: string): Promise<Book[]> {
    return this.prisma.book.findMany({
      include: {
        authors: {
          where: {
            id,
          },
        },
      },
    });
  }

  async create(bookInput: BookInput): Promise<Book> {
    const { title, authorIds } = bookInput;

    if (!authorIds || authorIds.length === 0) {
      throw new Error('At least one author is required to create a book.');
    }
    try {
      const book = await this.prisma.book.create({
        data: {
          title,
          authors: {
            connect: authorIds.map((id) => ({ id })),
          },
        },
      });
      await this.prisma.bookAuthor.createMany({
        data: authorIds.map((authorId) => ({
          bookId: book.id,
          authorId,
        })),
      });
      return book;
    } catch (e) {
      return null;
    }
  }

  async addAuthor(bookId: string, authorId: string): Promise<Book> {
    const book = await this.prisma.book.update({
      where: { id: bookId },
      data: {
        authors: {
          connect: [{ id: authorId }],
        },
      },
      include: {
        authors: true,
      },
    });

    return book;
  }

  async deleteBook(id: string): Promise<number> {
    const result = await this.prisma.book.delete({ where: { id } });

    return result ? 1 : 0;
  }
}
