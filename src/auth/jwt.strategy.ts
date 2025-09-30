// ==========================================================
// ♾️ jwt.strategy.ts | JWT Strategy
// ==========================================================
// Purpose:
// Verifies JWT tokens and attaches user info to request.
//
// Usage:
// - Triggered by JwtAuthGuard
//
// Tools Used:
// - Passport JWT Strategy
// - ConfigService
//
// Features:
// - Decodes token and validates signature
// - Attaches user info to request
// ==========================================================

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UserRole } from '../users/user.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  // --- Validate JWT payload and normalize user object ---
  async validate(payload: { sub: string; email: string; role: UserRole }) {
    return {
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}
