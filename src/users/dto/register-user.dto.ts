// ==========================================================
//  ♾️ register-user.dto.ts | User Registration Payload 🆕
// ==========================================================
// 🧠 Purpose:
// DTO for registering a new user account.
//
// 🔌 Usage:
// - POST /users/register
// - Called by UsersController > register()
//
// 🛠 Tools Used:
// - @nestjs/class-validator
//
// 📦 Features:
// - Validates email & password
// - Optional displayName
// ==========================================================

import { IsEmail, IsString, IsOptional } from 'class-validator';

export class RegisterUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  displayName?: string;
}
