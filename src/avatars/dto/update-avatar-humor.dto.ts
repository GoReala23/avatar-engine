// ==========================================================
//  ♾️ update-avatar-humor.dto.ts | Update Humor Profile 🤡
// ==========================================================
// 🧠 Purpose:
// DTO for updating avatar humor profiles.
//
// 🔌 Usage:
// - PATCH /avatars/humor/:slug/profile
//
// 🛠 Tools Used:
// - @nestjs/class-validator
//
// 📦 Features:
// - Validates humor profile string
// ==========================================================

import { IsString } from 'class-validator';

export class UpdateAvatarHumorDto {
  @IsString()
  humorProfile: string;
}
