import { NestFactory } from '@nestjs/core';
import { EventcentersModule } from './eventcenters.module';

async function bootstrap() {
  const app = await NestFactory.create(EventcentersModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
