// ==========================================================
// ♾️ auth.controller.ts | Authentication Controller
// ==========================================================
// Purpose:
// Handles login, logout, and role-based protected routes.
//
// Usage:
// - POST /auth/login (returns JWT + role)
// - POST /auth/logout (symbolic for now)
// - GET /auth/protected/user (user-only)
// - GET /auth/protected/mod (moderator+)
// - GET /auth/protected/admin (admin-only)
//
// Tools Used:
// - NestJS decorators
// - AuthService
// - JwtAuthGuard + RolesGuard
// - Swagger decorators
//
// Features:
// - Secure login with JWT
// - Role-based access enforcement
// - Logout placeholder for future blacklist
// ==========================================================

import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards,
  Get,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';
import { UserRole } from '../users/user.model';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // --- POST /auth/login | User login + return JWT ---
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;

    const user = await this.authService.validateUser(email, password);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const token = await this.authService.login(user);

    return {
      access_token: token,
      user: {
        userId: (user as any)._id.toString(),
        email: user.email,
        role: user.role,
      },
    };
  }

  // --- POST /auth/logout | Logout placeholder ---
  @Post('logout')
  logout(@Req() req) {
    // TODO: integrate Redis/token blacklist
    return { message: 'Logout successful (symbolic). Client must delete token.' };
  }

  // --- GET /auth/protected/user | User-only access ---
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.USER)
  @Get('protected/user')
  userAccess(@Req() req) {
    return { message: 'User access granted.', user: req.user };
  }

  // --- GET /auth/protected/mod | Moderator+ access ---
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.MOD, UserRole.ADMIN)
  @Get('protected/mod')
  moderatorAccess(@Req() req) {
    return { message: 'Moderator or Admin access granted.', user: req.user };
  }

  // --- GET /auth/protected/admin | Admin-only access ---
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get('protected/admin')
  adminAccess(@Req() req) {
    return { message: 'Admin-only access granted.', user: req.user };
  }
}
