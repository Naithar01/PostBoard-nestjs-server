import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      entities: [],
      synchronize: true,
    }),
    PostModule,
  ],
  controllers: [AppController],
})
export class AppModule {}

// https://velog.io/@injoon2019/NestJS-%EC%9D%B8%ED%94%84%EB%9F%B0-%EB%94%B0%EB%9D%BC%ED%95%98%EB%A9%B0-%EB%B0%B0%EC%9A%B0%EB%8A%94-NestJS#nestjs-%EC%86%8C%EA%B0%9C
