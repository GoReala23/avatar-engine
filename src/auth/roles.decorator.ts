// ==========================================================
// ♾️ roles.decorator.ts | Roles Decorator
// ==========================================================
// Purpose:
// Attaches required roles to routes for RBAC checks.
//
// Usage:
// - Apply as @Roles('admin') or @Roles('admin', 'mod')
//
// Tools Used:
// - NestJS SetMetadata
//
// Features:
// - Adds role metadata for RolesGuard
// - Supports multi-role access
// ==========================================================

import { SetMetadata } from '@nestjs/common';

// --- Custom decorator for role-based metadata ---
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
