import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors({
		origin: '*', // Allow all origins
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
		allowedHeaders: 'Content-Type, Authorization', // Allowed headers
		credentials: true, // Allow credentials (cookies, authorization headers, etc.)
	})

	app.useGlobalPipes(new ValidationPipe({
		whitelist: true, // Remove unknown fields
		forbidNonWhitelisted: true, // throws if unknown properties exist
		forbidUnknownValues: true, // prevents non-object values in DTOs
		transform: true, // Transform payload into DTO instance
	}));
	
	// Swagger Configuration
	const config = new DocumentBuilder()
		.setTitle('My Microservice API')
		.setDescription('API documentation for my NestJS microservice')
		.setVersion('1.0')
		.addTag('microservice')
		.build();


	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api/docs', app, document);

	await app.listen(8000);
}

bootstrap();
