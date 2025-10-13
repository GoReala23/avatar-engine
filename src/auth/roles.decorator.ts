// ==========================================================
// ♾️ roles.decorator.ts | Roles Decorator 👑
// ==========================================================
// 🧠 Purpose:
// Adds role-based metadata to routes, used by RolesGuard.
//
// 🛠 Tools Used:
// - NestJS SetMetadata()
// ==========================================================

import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
