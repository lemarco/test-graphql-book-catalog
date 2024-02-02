import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthorsService } from './service';
import { Author as AuthorDTO } from './dto/author.dto';
import { AuthorInput } from './dto/author.input';

@Resolver(() => AuthorDTO)
export class AuthorsResolver {
  constructor(private readonly authorsService: AuthorsService) {}

  @Query(() => AuthorDTO, { nullable: true })
  async getAuthor(@Args('id') id: string) {
    return await this.authorsService.findOneById(id);
  }

  @Query(() => [AuthorDTO], { nullable: true })
  async getAuthors(
    @Args('minNumberOfBooks') minNumberOfBooks?: number,
    @Args('maxNumberOfBooks') maxNumberOfBooks?: number,
  ) {
    return this.authorsService.findMany({ minNumberOfBooks, maxNumberOfBooks });
  }

  @Mutation(() => AuthorDTO)
  async createAuthor(@Args('author') author: AuthorInput) {
    return this.authorsService.create(author);
  }
  @Mutation(() => Int)
  async deleteAuthor(@Args('id') id: string): Promise<number> {
    return this.authorsService.deleteAuthor(id);
  }
  @Mutation(() => Int)
  async deleteAuthorWithBooks(@Args('id') id: string): Promise<number> {
    return this.authorsService.deleteAuthorWithBooks(id);
  }
}
