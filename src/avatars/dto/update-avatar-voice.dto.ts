// ==========================================================
//  ♾️ update-avatar-voice.dto.ts | Update Avatar Voice 🎤
// ==========================================================
// 🧠 Purpose:
// DTO for updating avatar voice settings and clips.
//
// 🔌 Usage:
// - PATCH /avatars/voice/:slug/default
//
// 🛠 Tools Used:
// - @nestjs/class-validator
//
// 📦 Features:
// - Supports updating default voice and clips
// ==========================================================

import { IsOptional, IsString } from 'class-validator';

export class UpdateAvatarVoiceDto {
  @IsOptional()
  @IsString()
  defaultVoiceProfile?: string;

  @IsOptional()
  voiceClips?: Record<string, string>;

  @IsOptional()
  voiceProfiles?: any[];
}
