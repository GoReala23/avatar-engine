// ==========================================================
//  ♾️ avatar-voice.service.ts | Avatar Engine™ Voice Logic 🎙️
// ==========================================================
// 🧠 Purpose:
// Manages voice profiles and emotion-based clips.
//
// 🔌 Usage:
// - Called by AvatarVoiceController
//
// 🛠 Tools Used:
// - NestJS Injectable service
// - Mongoose
//
// 📦 Features:
// - Assign default voice profile
// - Get clip by profile/emotion
// ==========================================================

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Avatar, AvatarDocument } from '../models/avatar.schema';

@Injectable()
export class AvatarVoiceService {
  constructor(@InjectModel(Avatar.name) private avatarModel: Model<AvatarDocument>) {}

  async assignDefaultProfile(slug: string, profileName: string, tenantId?: string): Promise<Avatar> {
    const fighter = await this.findBySlug(slug, tenantId);
    fighter.defaultVoiceProfile = profileName;
    return (fighter as AvatarDocument).save();
  }

  async getProfileClip(slug: string, profileName: string, emotion: string, tenantId?: string): Promise<string | null> {
    const avatar = await this.findBySlug(slug, tenantId);
    const profile = avatar.voiceProfiles?.find(p => p.name === profileName);
    return profile?.emotionClips?.[emotion] || profile?.defaultClip || null;
  }

  async getDefaultVoiceClip(slug: string, emotion: string, tenantId?: string): Promise<string | null> {
    const avatar = await this.findBySlug(slug, tenantId);
    return avatar.voiceClips?.[emotion] || null;
  }

  private async findBySlug(slug: string, tenantId?: string): Promise<Avatar> {
    const filter: any = { slug };
    if (tenantId) filter.tenantId = tenantId;
    const avatar = await this.avatarModel.findOne(filter).exec();
    if (!avatar) throw new NotFoundException(`Avatar "${slug}" not found.`);
    return avatar;
  }
}
