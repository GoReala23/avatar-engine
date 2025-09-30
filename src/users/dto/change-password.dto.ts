// ==========================================================
//  ♾️ change-password.dto.ts | User Password Update DTO 🔑
// ==========================================================
// 🧠 Purpose:
// Defines the structure and validation for password change 
// requests. Ensures strong password policy and prevents role/email tampering.
//
// 🔌 Usage:
// - PATCH /users/me/change-password (self-service flow)
//
// 🛠 Tools Used:
// - class-validator decorators
//
// 📦 Features:
// - Requires oldPassword (verify identity)
// - Requires newPassword (must meet min length)
// ==========================================================

import { IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
  // 🔑 Current password (verify before change)
  @IsString()
  oldPassword: string;

  // 🔑 New password (must be >= 8 chars)
  @IsString()
  @MinLength(8)
  newPassword: string;
}
