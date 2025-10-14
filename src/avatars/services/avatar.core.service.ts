// ==========================================================
//  ♾️ avatar-core.service.ts | Avatar Engine™ Core Logic ⚙️
// ==========================================================
// 🧠 Purpose:
// Handles all core avatar data operations — app-agnostic.
// Supports multi-tenant filtering and progression logic.
//
// 🔌 Usage:
// - Called by AvatarCoreController
//
// 🛠 Tools Used:
// - NestJS Injectable service
// - Mongoose ODM
//
// 📦 Features:
// - CRUD operations
// - XP/level progression
// - Rarity & style filtering
// - AI teaching stub
// ==========================================================

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import { slugify } from 'transliteration';
import { Avatar, AvatarDocument } from '../models/avatar.schema';
import { AiService } from '../../ai/ai.service';  

@Injectable()
export class AvatarCoreService {
  constructor(
    @InjectModel(Avatar.name)
    private avatarModel: Model<AvatarDocument>,
    private readonly aiService: AiService,
  ) {}

  // ===========================
  // 🟢 GET Methods
  // ===========================

  async findAll(tenantId?: string): Promise<Avatar[]> {
    const filter = tenantId ? { tenantId } : {};
    return this.avatarModel.find(filter).exec();
  }

  async findBySlug(slug: string, tenantId?: string): Promise<Avatar> {
    const filter: any = { slug };
    if (tenantId) filter.tenantId = tenantId;
    const avatar = await this.avatarModel.findOne(filter).exec();
    if (!avatar) throw new NotFoundException(`Avatar "${slug}" not found.`);
    return avatar;
  }

  async findByStyle(style: string, tenantId?: string): Promise<Avatar[]> {
 
  const cleanStyle = style.replace(/\s+/g, '').trim().toLowerCase();

  // Case-insensitive regex match
   const filter: any = { style: new RegExp(cleanStyle, 'i') };
  if (tenantId) filter.tenantId = tenantId;

  console.log('🧭 Filter Used:', filter);

  const results = await this.avatarModel.find(filter).exec();

  console.log(`🔍 Found ${results.length} avatars with style "${cleanStyle}"`);

  return results;
}




  async findByRarity(
    tier: 'common' | 'rare' | 'epic' | 'legendary',
    tenantId?: string,
  ): Promise<Avatar[]> {
    const filter: any = { rarity: tier };
    if (tenantId) filter.tenantId = tenantId;
    return this.avatarModel.find(filter).exec();
  }

  // ===========================
  // 🟡 POST Methods
  // ===========================

   async createAvatar(data: Partial<Avatar>, tenantId?: string): Promise<Avatar> {
    if (!data.name) throw new Error('Name is required to create an avatar.');

    // 🟢 TEMP: basic slug generator until transliteration is re-enabled
    if (!data.slug && data.name) {
      data.slug = data.name
        .toLowerCase()
        .replace(/\s+/g, '-')  
        .replace(/[^a-z0-9-]/g, ''); 
    }

    if (tenantId) (data as any).tenantId = tenantId;

    const newAvatar = new this.avatarModel(data);
    return await newAvatar.save();
  }


  // ===========================
  // 🟠 PATCH Methods
  // ===========================

// Generic update method for avatars
async updateAvatar(slug: string, updates: Partial<Avatar>, tenantId?: string) {
  const filter: any = { slug };
  if (tenantId) filter.tenantId = tenantId;
  return this.avatarModel.findOneAndUpdate(filter, updates, { new: true }).exec();
}

  async addXP(slug: string, xp: number, tenantId?: string): Promise<Avatar> {
    const fighter = await this.findBySlug(slug, tenantId);
    fighter.xp += xp;

    if (fighter.xp >= fighter.level * 100) {
      fighter.level += 1;
      fighter.xp = 0;
    }

    return (fighter as AvatarDocument).save();
  }

  async resetAvatar(slug: string, tenantId?: string): Promise<Avatar> {
    const fighter = await this.findBySlug(slug, tenantId);
    fighter.xp = 0;
    fighter.level = 1;
    return (fighter as AvatarDocument).save();
  }

  async unlockAvatar(slug: string, tenantId?: string): Promise<Avatar> {
    const fighter = await this.findBySlug(slug, tenantId);
    fighter.unlockedByDefault = true;
    return (fighter as AvatarDocument).save();
  }

  // ===========================
  // 🔴 DELETE Methods
  // ===========================

  async deleteAvatar(
    slug: string,
    tenantId?: string,
  ): Promise<{ deleted: boolean }> {
    const filter: any = { slug };
    if (tenantId) filter.tenantId = tenantId;
    const result = await this.avatarModel.deleteOne(filter).exec();
    return { deleted: result.deletedCount > 0 };
  }

  // ===========================
  // 🤖 AI Stub
  // ===========================

    async generateAIResponseForAvatar(slug: string, context: string): Promise<string> {
    const fighter = await this.findBySlug(slug);
    return this.aiService.generateForAvatar(fighter.name, fighter.style, context);
  }


  // ===========================
  // 🔊 Voice Stub
  // ===========================

  async getDefaultVoiceClip(slug: string): Promise<string> {
    const avatar = await this.avatarModel.findOne({ slug });
    const defaultVoice = avatar?.voiceProfiles?.[0];
    return defaultVoice?.defaultClip || 'https://example.com/fallback.mp3';
  }
}
