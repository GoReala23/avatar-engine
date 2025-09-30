// ==========================================================
// ♾️ roles.guard.ts | Roles Guard
// ==========================================================
// Purpose:
// Enforces role-based access control using route metadata.
//
// Usage:
// - Applied with @UseGuards(JwtAuthGuard, RolesGuard)
//
// Tools Used:
// - NestJS Reflector
// - CanActivate
//
// Features:
// - Blocks unauthorized users even with valid JWT
// - Supports multi-role access
// ==========================================================

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  // --- Check roles from metadata and match with user role ---
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !requiredRoles.includes(user.role)) {
      throw new ForbiddenException('Insufficient role');
    }

    return true;
  }
}
