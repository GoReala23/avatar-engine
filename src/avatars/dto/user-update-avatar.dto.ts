// ==========================================================
//  ♾️ user-update-avatar.dto.ts | User Update DTO 🎭
// ==========================================================
// 🧠 Purpose:
// Defines what a normal user is allowed to update on their avatar.
// Only cosmetic/personalization fields — NOT progression or rarity.
// ==========================================================

import { IsOptional, IsString, IsArray, ArrayNotEmpty } from 'class-validator';

export class UserUpdateAvatarDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  actions?: string[];

  @IsOptional()
  @IsString()
  humorProfile?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  coachingStyle?: string[];
}
