// ==========================================================
// ♾️ roles.decorator.ts | Roles Decorator 👑
// ==========================================================
// 🧠 Purpose:
// Attach role metadata to routes, used by RolesGuard.
// Example: @Roles('admin')
// ==========================================================

import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
