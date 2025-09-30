// ==========================================================
//  ♾️ avatar-core.schema.ts | Avatar Engine™ Core Schema 🧠
// ==========================================================
// 🧠 Purpose:
// Defines the base identity, progression, and branding fields
// for avatars in the Avatar Engine™.
//
// 🔌 Usage:
// - Imported into the master schema (avatar.schema.ts)
// - Acts as the foundation for all app-specific avatar data
//
// 🛠 Tools Used:
// - Mongoose (MongoDB ORM)
// - NestJS Schema decorators
//
// 📦 Features:
// - Identity & unique slug
// - XP/level progression & rarity
// - Media/branding links
// - Tenant overrides for multi-app use
// ==========================================================

import * as mongoose from 'mongoose';
import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class AvatarCore {
  // 🆔 Identity
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  slug: string;

  // 🏆 Progression
  @Prop({ default: 1 })
  level: number;

  @Prop({ default: 0 })
  xp: number;

  @Prop({ type: [String], default: [] })
  badgesUnlocked: string[];

  @Prop({ default: 'common' })
  rarity: 'common' | 'rare' | 'epic' | 'legendary';

  @Prop({ default: false })
  unlockedByDefault: boolean;

  // 🌐 Multi-Tenant Override Support
  @Prop({ type: Map, of: mongoose.Schema.Types.Mixed, default: {} })
  tenantOverrides?: Record<string, Partial<AvatarCore>>;

  // 🎨 Branding / Media
  @Prop({ default: '{♾️}' })
  crestSymbol: string;

  @Prop()
  avatarImageUrl: string;

  @Prop()
  themeMusic: string;

  // 🎮 Animation
  @Prop({ type: Object, default: {} })
  activationHooks: Record<string, string>;

  @Prop({ type: Object, default: {} })
  spriteMap: Record<string, string>;
}
