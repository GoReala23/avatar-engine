// ==========================================================
// ♾️ create-avatar.dto.ts | DTO for Avatar Creation 🧩
// ==========================================================
// 🧠 Purpose:
// Validates the input when creating a new avatar.
// Ensures schema-required fields are provided.
//
// 🛠 Tools Used:
// - class-validator
// - class-transformer
//
// 📦 Features:
// - Name, type, rarity, slug, xp, and level validation
// - Optional tenantId for multi-tenant systems
// ==========================================================

import { IsString, IsOptional, IsIn, IsNumber, Min } from 'class-validator';

export class CreateAvatarDto {
  @IsString()
  name: string;

  @IsString()
  type: string; // required by schema

  @IsOptional()
  @IsString()
  slug?: string;

  @IsString()
  @IsOptional()
  style?: string;

  @IsIn(['common', 'rare', 'epic', 'legendary'])
  rarity: 'common' | 'rare' | 'epic' | 'legendary';

  @IsOptional()
  @IsNumber()
  @Min(1)
  level?: number = 1;

  @IsOptional()
  @IsNumber()
  @Min(0)
  xp?: number = 0;

  @IsOptional()
  @IsString()
  tenantId?: string;
}
