// ============================================================
// ♾️ main.ts | NestJS App Bootstrap 🚀
// ============================================================
// 🧠 Purpose:
// Entry point of the Avatar Engine™ backend.
// Initializes NestJS, sets up validation, CORS, and Swagger API docs.
//
// 🛠 Tools Used:
// - NestFactory (NestJS Core)
// - ValidationPipe (Input sanitization)
// - SwaggerModule (API documentation)
// ============================================================

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);

 
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, 
      forbidNonWhitelisted: true, 
      transform: true,
    }),
  );

  
  app.enableCors();


  // ============================================================
// 🧭 Swagger Documentation Setup
// ============================================================


const config = new DocumentBuilder()
  .setTitle('Avatar Engine™ API')
  .setDescription('Endpoints for managing avatars, humor, and voice modules.')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`⚡ Server running at http://localhost:${port}`);
  console.log(`📘 Swagger docs available at http://localhost:${port}/api/docs`);
}

bootstrap();
