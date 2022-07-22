import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes();

  const config = new DocumentBuilder()
    .setTitle('고졸국뷔 게시판')
    .setDescription('고졸국뷔 게시판 API입니다.')
    .setVersion('1.0.0')
    .addTag('board')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(4000);
}
bootstrap();
