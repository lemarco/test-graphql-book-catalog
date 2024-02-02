import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { AuthorsModule } from './authors/module';
import { BooksModule } from './books/module';
import * as joi from 'joi';
// import DataLoader from 'dataloader'; For n+1  batch load
// import { createComplexityLimitRule } from 'graphql-validation-complexity'; query complexity middleware handler
@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
      validationSchema: joi.object({
        BOOK_CATALOG_DB_URL: joi.string().required(),
        BOOK_CATALOG_SERVICE_PORT: joi.string().required().default(5000),

        BOOK_CATALOG_SERVICE_HOST: joi.string().required(),
      }),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      path: '/api/graphql',
    }),
    AuthorsModule,
    BooksModule,
  ],
})
export class AppModule {}
