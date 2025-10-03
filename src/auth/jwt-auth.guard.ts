// ==========================================================
// ♾️ jwt-auth.guard.ts | JWT Auth Guard 🚧
// ==========================================================
// 🧠 Purpose:
// Protects routes by requiring a valid JWT.
// Currently stubbed (just extends AuthGuard).
//
// 📦 Features (future):
// - Throws 401 if no/invalid token
// - Injected into controllers with @UseGuards
// ==========================================================

import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
