// ==========================================================
// ♾️ jwt.strategy.ts | JWT Strategy 🛡️
// ==========================================================
// 🧠 Purpose:
// Passport strategy for validating JWTs.
// Currently stubbed (accepts any payload).
//
// 📦 Features (future):
// - Extract JWT from Authorization header
// - Validate signature & payload
// - Attach user object to request
// ==========================================================

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'changeme',
    });
  }

  async validate(payload: any) {
    // 🟡 Stub: Normally return user object from DB
    return { userId: payload.sub, email: payload.email };
  }
}
