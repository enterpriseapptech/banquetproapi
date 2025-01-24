import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Remove unknown fields
    // forbidNonWhitelisted: true, // Throw an error for extra fields
    transform: true, // Transform payload into DTO instance
  })) ;
  await app.listen(8000);
}
bootstrap();
