// ==========================================================
// ♾️ roles.guard.ts | Roles Guard 🛡️
// ==========================================================
// 🧠 Purpose:
// Enforces role-based access control.
// Stub: currently always allows, will check user.role later.
// ==========================================================

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 🔍 Look up required roles from @Roles decorator
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(), // method-level
      context.getClass(),   // class-level
    ]);

    if (!requiredRoles) return true; // ✅ If no roles, allow request

    const { user } = context.switchToHttp().getRequest();
    // 🟡 Stub: always allow — later check `user.role`
    return true;
  }
}
