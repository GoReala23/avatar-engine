// ==========================================================
// ♾️ app.module.ts | Root Application Module 🌐
// ==========================================================
// 🧠 Purpose:
// Bootstraps the NestJS app. Now wired with Config + Mongoose.
// Future commits will add Auth, Users, Avatars.
// ==========================================================

import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose';
import {AppController} from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // Load .env globally
    ConfigModule.forRoot({ isGlobal: true}),
    // Connect to MongoDB
    MongooseModule.forRoot(process.env.MONGO_URI || ''),

    // Future modules will go here (Auth, Users, Avatars, etc)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
