/* eslint-disable */
export default async () => {
  const t = {};
  return {
    '@nestjs/graphql': {
      models: [
        [
          import('./authors/dto/author.input'),
          { AuthorInput: { firstName: {}, lastName: {} } },
        ],
        [
          import('./books/dto/book.input'),
          { BookInput: { title: {}, authorIds: {} } },
        ],
      ],
    },
  };
};
