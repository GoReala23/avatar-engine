// ============================================================
// ♾️ app.service.ts | Base Service 🛠️
// ============================================================
// 🧠 Purpose: Handles simple business logic. Provides data to controllers.
// ============================================================

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  
  getHello(): string {
    return 'Hello World!';
  }
}
