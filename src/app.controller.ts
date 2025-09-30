// ============================================================
// ♾️ app.controller.ts | Base Controller 🕹️
// ============================================================
// 🧠 Purpose: Defines routes/endpoints for testing the app. Use AppService
// ============================================================

import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    // 🎯 Calls AppService → returns "Hello World!"
    return this.appService.getHello();
  }
}
