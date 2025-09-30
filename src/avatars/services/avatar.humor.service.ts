// ==========================================================
//  ♾️ avatar-humor.service.ts | Avatar Engine™ Humor Logic 😂
// ==========================================================
// 🧠 Purpose:
// Manages humor profiles and quote retrieval.
//
// 🔌 Usage:
// - Called by AvatarHumorController
//
// 🛠 Tools Used:
// - NestJS Injectable service
// - Mongoose
//
// 📦 Features:
// - Assign humor profile
// - Get random quote
// ==========================================================

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Avatar, AvatarDocument } from '../models/avatar.schema';

@Injectable()
export class AvatarHumorService {
  constructor(@InjectModel(Avatar.name) private avatarModel: Model<AvatarDocument>) {}

  async assignHumorProfile(slug: string, humorProfile: string, tenantId?: string): Promise<Avatar> {
    const fighter = await this.findBySlug(slug, tenantId);
    fighter.humorProfile = humorProfile;
    return (fighter as AvatarDocument).save();
  }

  async getRandomQuote(slug: string, tenantId?: string): Promise<string | null> {
    const avatar = await this.findBySlug(slug, tenantId);
    if (!avatar.quotes?.length) return null;
    const randomIndex = Math.floor(Math.random() * avatar.quotes.length);
    return avatar.quotes[randomIndex];
  }

  private async findBySlug(slug: string, tenantId?: string): Promise<Avatar> {
    const filter: any = { slug };
    if (tenantId) filter.tenantId = tenantId;
    const avatar = await this.avatarModel.findOne(filter).exec();
    if (!avatar) throw new NotFoundException(`Avatar "${slug}" not found.`);
    return avatar;
  }
}
