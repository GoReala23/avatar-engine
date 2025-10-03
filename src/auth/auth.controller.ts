// ==========================================================
// ♾️ auth.controller.ts | Authentication Controller 🔑
// ==========================================================
// 🧠 Purpose:
// Exposes login/register endpoints for the app.
// Currently stubbed: returns mock tokens & user info.
//
// 📦 Features (future):
// - Login with email/password
// - Registration (optional if handled in UsersController)
// - Refresh token
// ==========================================================

import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth') // Base path = /auth
export class AuthController {
  constructor(private readonly authService: AuthService) {} // Inject AuthService

  @Post('login') 
  async login(@Body() body: { email: string; password: string }) {
   
    return this.authService.login(body.email, body.password);
  }
}
