// ==========================================================
//  ♾️ admin-update-user.dto.ts | Admin User Update DTO 🛠️
// ==========================================================
// 🧠 Purpose:
// Defines what fields an **admin** can update on a user account.
// - Includes role + email (unlike UpdateUserDto).
// - Excludes sensitive fields like _id or createdAt.
//
// 🔌 Usage:
// - PATCH /users/:id/admin-update
//
// 🛠 Tools Used:
// - class-validator decorators
// ==========================================================

import { IsOptional, IsString, IsEmail, MinLength, IsEnum } from 'class-validator';
import { UserRole } from '../user.model';

export class AdminUpdateUserDto {
  // 🏷️ Display name
  @IsOptional()
  @IsString()
  displayName?: string;

  // 📧 Email (admin can update if needed)
  @IsOptional()
  @IsEmail()
  email?: string;

  // 🎙️ Preferred voice
  @IsOptional()
  @IsString()
  preferredVoice?: string;

  // ⚙️ App settings
  @IsOptional()
  appSettings?: {
    theme?: string;
    accessibilityMode?: boolean;
  };

  // 🔑 Password (must be hashed in service)
  @IsOptional()
  @IsString()
  @MinLength(8)
  password?: string;

  // 👑 Role (admin-only)
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
