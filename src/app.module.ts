// ============================================================
// ♾️ app.module.ts | Root Module 🌐
// ============================================================
// 🧠 Purpose: Pulls together config + features. Imports DB + modules.
// ============================================================

import { Module, Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/user.module';
import { AvatarsModule } from './avatars/avatars.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // load .env
      MongooseModule.forRootAsync({
      useFactory: async () => {
          const { DB_USER, DB_PASSWORD, DB_CLUSTER, DB_NAME, APP_NAME, MONGO_URI } = process.env;

  const uri =
    MONGO_URI ||
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_CLUSTER}.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=${APP_NAME}`;

        if (!uri) {
          Logger.warn('⚠️  No MONGO_URI found in .env file');
        } else {
          Logger.log(`🌿 Connecting to MongoDB at: ${uri}`);
        }
        return { uri };
      },
    }),
    UsersModule, // user accounts 👤
    AuthModule,  // login / JWT 🔑
    AvatarsModule, // avatar engine ⚔️
  ],
})
export class AppModule {}
