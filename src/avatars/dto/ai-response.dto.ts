// ==========================================================
//  ♾️ ai-response.dto.ts | Avatar AI Response Input 🤖
// ==========================================================
// 🧠 Purpose:
// DTO to pass context for an avatar to generate a teaching-style reply.
//
// 🔌 Usage:
// - POST /avatars/:slug/ai-response
//
// 🛠 Tools Used:
// - @nestjs/class-validator
//
// 📦 Features:
// - Requires context (string)
// ==========================================================

import { IsString } from 'class-validator';

export class AIResponseDto {
  @IsString()
  context: string;
}
