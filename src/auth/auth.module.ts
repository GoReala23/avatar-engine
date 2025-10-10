// ==========================================================
// ♾️ auth.module.ts | Authentication Module Stub 🔑
// ==========================================================
// 🧠 Purpose:
// Temporary module to satisfy imports in AppModule
// and prepare for future JWT-based authentication.
//
// 📦 Features:
// - Provides structure for AuthController + AuthService
// - Prevents compile errors for missing module
// ==========================================================
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy'; 
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/user.module';

@Module({
      imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'fallback_secret',
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
