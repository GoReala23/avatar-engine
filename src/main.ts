// ============================================================
// ♾️ main.ts | NestJS App Bootstrap 🚀
// ============================================================
// 🧠 Purpose: Entry point of the app. Starts NestJS, enables 
// validation and CORS. Future commits will add DB + Swagger.
// ============================================================

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);

 
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, 
      forbidNonWhitelisted: true, 
    }),
  );

  
  app.enableCors();


  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
