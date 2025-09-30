// ==========================================================
//  ♾️ update-user.dto.ts | User Self Update DTO 📝
// ==========================================================
// 🧠 Purpose:
// Defines what a user can update on their own account.
// Includes profile info, settings, and password change.
// Excludes role/email (admin only).
// ==========================================================

import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  // 🏷️ Display name (optional)
  @IsOptional()
  @IsString()
  displayName?: string;

  // 🎙️ Preferred voice (optional)
  @IsOptional()
  @IsString()
  preferredVoice?: string;

  // ⚙️ App settings (nested object)
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
}
