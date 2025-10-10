// ==========================================================
// ♾️ auth.controller.ts | Authentication Controller 🔑
// ==========================================================
// 🧠 Purpose:
// Exposes authentication endpoints for login and registration.
// Delegates credential checks to AuthService and persistence to UsersService.
//
// 🔌 Usage:
// - POST /auth/login → returns JWT + user info
// - POST /auth/register → creates new user (default role: USER)
//
// 🛠 Tools Used:
// - AuthService (JWT + validation)
// - UsersService (user persistence)
// - DTOs (LoginDto, RegisterUserDto)
// - UserRole enum
// ==========================================================


import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/user.service';
import { UserRole } from '../users/user.model';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth') 
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {} 

  @Post('login')
  async login(@Body() body: LoginDto) {
    return this.authService.login(body.email, body.password);
  }

    @Post('register')
  async register(@Body() body:RegisterUserDto){
    return this.usersService.createUser({
      ...body,
      role: UserRole.USER,
    });
  }
}
