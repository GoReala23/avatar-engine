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

import { Injectable, NotFoundException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService, private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || 'changeme',
    });
  }

 async validate(payload: { sub: string; email: string; role?: string }) {
    const user = await this.usersService.findById(payload.sub);
    if (!user) throw new NotFoundException('User not found'); 
    // Strip password and return a safe object
    const { password, ...safe } = user.toObject ? user.toObject() : user;
    return safe;
  }
}
