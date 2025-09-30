// ==========================================================
//  ♾️ avatar-humor.controller.ts | Avatar Engine™ Humor API 😂
// ==========================================================
// 🧠 Purpose:
// API endpoints for humor profiles and quote retrieval.
//
// 🔌 Usage:
// - Connects to AvatarHumorService
//
// 🛠 Tools Used:
// - NestJS
// - Swagger decorators
//
// 📦 Features:
// - Assign humor profile
// - Get random quote
// ==========================================================

import { Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { AvatarHumorService } from '../services/avatar.humor.service';

@ApiTags('Avatar Humor')
@Controller('avatars/humor')
export class AvatarHumorController {
  constructor(private readonly humorService: AvatarHumorService) {}

  @Patch(':slug/profile')
  @ApiQuery({ name: 'profile', required: true, example: 'dry-sarcasm' })
  assignHumorProfile(
    @Param('slug') slug: string,
    @Query('profile') profile: string,
    @Query('tenantId') tenantId?: string,
  ) {
    return this.humorService.assignHumorProfile(slug, profile, tenantId);
  }

  @Get(':slug/quote')
  getRandomQuote(@Param('slug') slug: string, @Query('tenantId') tenantId?: string) {
    return this.humorService.getRandomQuote(slug, tenantId);
  }
}
