import { Field, ObjectType } from '@nestjs/graphql';
import { Author } from '../../authors/dto/author.dto';

@ObjectType()
export class Book {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field(() => [Author])
  authors: Author[];
}
