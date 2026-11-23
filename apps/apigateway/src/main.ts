import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpLoggingInterceptor } from './common/interceptors/http-logging.interceptor';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.use(cookieParser());
	app.enableCors({
		origin: true, // Reflect the request's Origin, so any origin is allowed
		methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
		// allowedHeaders omitted: the cors package echoes back whatever headers the browser requests.
		// ('*' is not honoured as a wildcard by browsers when credentials are used, and never covers Authorization.)
		credentials: true, // Allow credentials (cookies, authorization headers, etc.)
		optionsSuccessStatus: 204,
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
    app.enableShutdownHooks(); 
	app.useGlobalInterceptors(new HttpLoggingInterceptor());
	await app.listen(8000);
}

bootstrap();
