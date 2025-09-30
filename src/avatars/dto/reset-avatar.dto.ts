// ==========================================================
//  ♾️ reset-avatar.dto.ts | Reset Avatar XP + Level 🧼
// ==========================================================
// 🧠 Purpose:
// DTO to reset avatar progression back to level 1, XP 0.
//
// 🔌 Usage:
// - PATCH /avatars/:slug/reset
//
// 🛠 Tools Used:
// - @nestjs/class-validator
//
// 📦 Features:
// - Optional tenant filtering
// ==========================================================

import { IsOptional, IsString } from 'class-validator';

export class ResetAvatarDto {
  @IsOptional()
  @IsString()
  tenantId?: string;
}
