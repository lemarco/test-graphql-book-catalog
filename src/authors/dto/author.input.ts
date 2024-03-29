import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AuthorInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;
}
