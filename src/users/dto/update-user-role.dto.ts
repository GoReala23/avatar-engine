// ==========================================================
//  ♾️ update-user-role.dto.ts | Update User Role 🔐
// ==========================================================
// 🧠 Purpose:
// DTO for updating user roles. Kept separate from UpdateUserDto
// to enforce explicit admin-only role updates.
//
// 🔌 Usage:
// - PATCH /users/:id/role
//
// 🛠 Tools Used:
// - @nestjs/class-validator
//
// 📦 Features:
// - Validates role as one of the allowed enums
// ==========================================================

import { IsString, IsIn } from 'class-validator';

export class UpdateUserRoleDto {
  @IsString()
  @IsIn(['user', 'mod', 'admin'])
  role: 'user' | 'mod' | 'admin';
}
