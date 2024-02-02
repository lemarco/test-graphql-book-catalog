import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BooksService } from './service';
import { Book } from './dto/book.dto';
import { BookInput } from './dto/book.input';

@Resolver(() => Book)
export class BooksResolver {
  constructor(private readonly booksService: BooksService) {}

  @Query(() => Book, { nullable: true })
  async getBook(@Args('id') id: string) {
    return this.booksService.findOneById(id);
  }

  @Query(() => [Book])
  async getBooks(
    @Args('title', { nullable: true }) title?: string,
  ): Promise<Book[]> {
    if (title) {
      return this.booksService.getBooksByTitle(title);
    } else {
      return this.booksService.getAllBooks();
    }
  }

  @Mutation(() => Book, { nullable: true })
  async createBook(@Args('book') book: BookInput) {
    return this.booksService.create(book);
  }
  @Mutation(() => Book)
  async addAuthor(
    @Args('bookId') bookId: string,
    @Args('authorId') authorId: string,
  ) {
    return this.booksService.addAuthor(bookId, authorId);
  }
}
