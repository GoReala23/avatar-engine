// ==========================================================
// ♾️ auth.module.ts | Authentication Module 🔑
// ==========================================================
// 🧠 Purpose:
// Provides login, JWT, and role-based access logic.
// Right now just a stub to keep the project compiling.
//
// 📦 Features (future):
// - JWT strategy
// - Guards (roles)
// - Auth service + controller
// ==========================================================

import { Module } from '@nestjs/common';

@Module({
  imports: [], // will add PassportModule, JwtModule, UsersModule later
  controllers: [], // will add AuthController later
  providers: [], // will add AuthService, JwtStrategy later
  exports: [],   // will export AuthService later
})
export class AuthModule {}
