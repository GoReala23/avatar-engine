// ==========================================================
// ♾️ login.dto.ts | Login DTO 🔑
// ==========================================================
// 🧠 Purpose:
// Defines required fields for user login requests.
// Ensures email is valid and password meets security rules.
//
// 🔌 Usage:
// - Used by AuthController → POST /auth/login
// - Validated automatically via ValidationPipe
//
// 🛠 Tools Used:
// - class-validator decorators (@IsEmail, @IsString, @MinLength)
// ==========================================================

import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail() // must be a valid email
  email: string;

  @IsString()
  @MinLength(8) // keep password validation consistent
  password: string;
}
