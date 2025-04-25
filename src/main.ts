import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

    const config = new DocumentBuilder()
        .setTitle('My API')
        .setDescription('API docs')
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());
    app.enableCors({
        origin: process.env.CORS_ORIGIN || "http://localhost:4173" ,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
