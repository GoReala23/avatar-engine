// ==========================================================
// ♾️ auth.module.ts | Authentication Module 🔑
// ==========================================================
// 🧠 Purpose:
// Handles authentication flow (login, JWT validation).
// Provides AuthController + AuthService, JWT strategy, guards.
// 
// 🔌 Usage:
// - Imported in AppModule
// - Injects UsersModule for user lookup
// - Exposes AuthService for login + token verification
//
// 🛠 Tools Used:
// - @nestjs/jwt (JWT handling)
// - @nestjs/passport (Passport integration)
// - passport-jwt (JWT strategy)
// - UsersModule for user lookups
//
// 📦 Features (MVP):
// - POST /auth/login
// - JWT validation via JwtStrategy
// - Guard (JwtAuthGuard) to protect routes
// ==========================================================

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';          
import { AuthController } from './auth.controller';     
import { JwtStrategy } from './jwt.strategy';        
import { JwtAuthGuard } from './jwt-auth.guard';        

import { UsersModule } from '../users/user.module';     

@Module({
  imports: [
    UsersModule,                     
    PassportModule,                  
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'changeme',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],   
  providers: [
    AuthService,                     
    JwtStrategy,
    JwtAuthGuard,
  ],
  exports: [AuthService],            
})
export class AuthModule {}
