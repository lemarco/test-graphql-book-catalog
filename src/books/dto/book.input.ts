import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class BookInput {
  @Field()
  title: string;

  @Field(() => [ID])
  authorIds: string[];
}
