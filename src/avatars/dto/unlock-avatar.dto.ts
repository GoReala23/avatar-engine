// ==========================================================
//  ♾️ unlock-avatar.dto.ts | Unlock Avatar Action 🔓
// ==========================================================
// 🧠 Purpose:
// DTO to trigger an avatar unlock (used by onboarding, admin, or progression systems).
//
// 🔌 Usage:
// - PATCH /avatars/:slug/unlock
//
// 🛠 Tools Used:
// - @nestjs/class-validator
//
// 📦 Features:
// - Optional tenant support
// ==========================================================

import { IsOptional, IsString } from 'class-validator';

export class UnlockAvatarDto {
  @IsOptional()
  @IsString()
  tenantId?: string;
}
