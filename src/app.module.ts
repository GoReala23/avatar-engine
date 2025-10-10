// ============================================================
// ♾️ app.module.ts | Root Module 🌐
// ============================================================
// 🧠 Purpose: Pulls together config + features. Imports DB + modules.
// ============================================================

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/user.module';
import { AvatarsModule } from './avatars/avatars.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // load .env
    MongooseModule.forRoot(process.env.MONGO_URI), // DB 🔌
    UsersModule, // user accounts 👤
    AuthModule,  // login / JWT 🔑
    AvatarsModule, // avatar engine ⚔️
  ],
})
export class AppModule {}
