// ==========================================================
// ♾️ auth.service.ts | Authentication Service
// ==========================================================
// Purpose:
// Handles user validation and JWT signing.
//
// Usage:
// - Called by AuthController for login/logout
// - Injected into Guards & Strategies
//
// Tools Used:
// - UsersService
// - bcrypt for password comparison
// - JwtService
//
// Features:
// - Validate email/password
// - Issue signed JWT with role
// - Placeholder for token blacklist
// ==========================================================

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/user.service';
import { User, UserRole } from '../users/user.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // --- Validate user credentials (email + password) ---
  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.usersService.findByEmail(email);
    if (!user) return null;

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) return null;

    return user;
  }

  // --- Sign and return JWT for authenticated user ---
  async login(user: User) {
    const payload = {
      sub: (user as any)._id,
      email: user.email,
      role: user.role || UserRole.USER,
    };
    return this.jwtService.sign(payload);
  }

  // --- Logout placeholder (blacklist integration pending) ---
  async logout(token: string) {
    // TODO: implement Redis or DB token blacklist
    return { message: 'Logout successful (symbolic).' };
  }
}
