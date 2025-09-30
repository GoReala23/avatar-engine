// ==========================================================
//  ♾️ avatar-voice.controller.ts | Avatar Engine™ Voice API 🎙️
// ==========================================================
// 🧠 Purpose:
// API endpoints for assigning voice profiles and retrieving emotion clips.
//
// 🔌 Usage:
// - Connects to AvatarVoiceService
//
// 🛠 Tools Used:
// - NestJS
// - Swagger decorators
//
// 📦 Features:
// - Assign default profile
// - Get clip by profile/emotion
// ==========================================================

import { Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { AvatarVoiceService } from '../services/avatar.voice.service';

@ApiTags('Avatar Voice')
@Controller('avatars/voice')
export class AvatarVoiceController {
  constructor(private readonly voiceService: AvatarVoiceService) {}

  @Patch(':slug/default')
  @ApiQuery({ name: 'profile', required: true, example: 'Jamaican Big Bro' })
  assignDefaultProfile(
    @Param('slug') slug: string,
    @Query('profile') profile: string,
    @Query('tenantId') tenantId?: string,
  ) {
    return this.voiceService.assignDefaultProfile(slug, profile, tenantId);
  }

  @Get(':slug/clip')
  @ApiQuery({ name: 'profile', required: true, example: 'Jamaican Big Bro' })
  @ApiQuery({ name: 'emotion', required: true, example: 'excited' })
  getProfileClip(
    @Param('slug') slug: string,
    @Query('profile') profile: string,
    @Query('emotion') emotion: string,
    @Query('tenantId') tenantId?: string,
  ) {
    return this.voiceService.getProfileClip(slug, profile, emotion, tenantId);
  }

  @Get(':slug/default-clip')
  @ApiQuery({ name: 'emotion', required: true, example: 'excited' })
  getDefaultClip(
    @Param('slug') slug: string,
    @Query('emotion') emotion: string,
    @Query('tenantId') tenantId?: string,
  ) {
    return this.voiceService.getDefaultVoiceClip(slug, emotion, tenantId);
  }
}
