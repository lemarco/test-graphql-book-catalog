import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Book } from '../../books/dto/book.dto';

@ObjectType()
export class Author {
  @Field((type) => ID, { nullable: true })
  id: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field((type) => [Book])
  books: Book[];
}
