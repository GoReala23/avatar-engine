// ==========================================================
//  ♾️ admin-update-avatar.dto.ts | Admin Update DTO 🛠
// ==========================================================
// 🧠 Purpose:
// Defines what admins can update on avatars.
// Full catalog control: name, rarity, level, xp, unlockedByDefault.
// ==========================================================

import { IsOptional, IsString, IsNumber, IsBoolean } from 'class-validator';

export class AdminUpdateAvatarDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';

  @IsOptional()
  @IsNumber()
  level?: number;

  @IsOptional()
  @IsNumber()
  xp?: number;

  @IsOptional()
  @IsBoolean()
  unlockedByDefault?: boolean;
}
