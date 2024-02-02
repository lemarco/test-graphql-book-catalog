import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Book } from '../books/dto/book.dto';

@ObjectType()
export class Author {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field(() => [Book])
  books: Book[];
}
