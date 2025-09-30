// ==========================================================
// ♾️ jwt-auth.guard.ts | JWT Authentication Guard
// ==========================================================
// Purpose:
// Activates the JwtStrategy for validating user access.
//
// Usage:
// - Applied with @UseGuards(JwtAuthGuard)
//
// Tools Used:
// - NestJS AuthGuard
// - Passport integration
//
// Features:
// - Validates JWT from request headers
// - Throws 401 if invalid/missing
// ==========================================================

import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
// --- Guard extending Passport's 'jwt' strategy ---
export class JwtAuthGuard extends AuthGuard('jwt') {}
