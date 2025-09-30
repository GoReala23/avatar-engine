// ==========================================================
//  ♾️ add-xp.dto.ts | XP Level-Up Logic Payload 📈
// ==========================================================
// 🧠 Purpose:
// DTO for adding experience points to an avatar.
//
// 🔌 Usage:
// - PATCH /avatars/:slug/xp
// - Called by avatar-core.controller > service.addXP()
//
// 🛠 Tools Used:
// - @nestjs/class-validator
//
// 📦 Features:
// - Requires xp amount (number)
// - Optional tenantId support
// ==========================================================

import { IsNumber, IsOptional, IsString } from 'class-validator';

export class AddXpDto {
  @IsNumber()
  xp: number;

  @IsOptional()
  @IsString()
  tenantId?: string;
}
