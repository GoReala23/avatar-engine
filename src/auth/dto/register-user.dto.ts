// ==========================================================
// ♾️ register-user.dto.ts | Register User DTO 📝
// ==========================================================
// 🧠 Purpose:
// Defines payload for registering new users.
// Enforces email validity, password strength, and optional displayName.
//
// 🔌 Usage:
// - Used by AuthController → POST /auth/register
// - Validated automatically via ValidationPipe
//
// 🛠 Tools Used:
// - class-validator decorators (@IsEmail, @IsString, @MinLength, @IsOptional)
// ==========================================================


import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';

export class RegisterUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8) 
  password: string;

  @IsOptional()
  @IsString()
  displayName?: string;
}
