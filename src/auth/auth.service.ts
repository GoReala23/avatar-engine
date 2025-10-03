// ==========================================================
// ♾️ auth.service.ts | Authentication Service 🔒
// ==========================================================
// 🧠 Purpose:
// Handles core auth logic (login, register, JWT).
// Stubbed: no DB, just returns fake user + token.
//
// 📦 Features (future):
// - Hash & compare passwords with bcrypt
// - JWT signing/verification
// - Token refresh
// ==========================================================

import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async login(email: string, password: string) {
    // 🟡 Stub: normally verify user & password hash
    return {
      access_token: 'fake-jwt-token',
      user: { email },
    };
  }
}
