// ==========================================================
// ♾️ auth.service.ts | Authentication Service 🔒
// ==========================================================
// 🧠 Purpose:
// Handles core auth logic (login, register, JWT).
// Stubbed: no DB, just returns fake user + token.
//
// 📦 Features (future):
// - Validate user credentials
// - Return signed JWT payload
// ==========================================================

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

   async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

      
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

     
    const { password: _, ...safeUser } = user.toObject();
    return safeUser;
  }
    async login(email: string, password: string) {
    const user = await this.validateUser(email, password);

      
    const payload = { sub: user._id, email: user.email, role: user.role };

    return {
      access_token: this.jwtService.sign(payload),
      user, 
    };
  }

  
}
