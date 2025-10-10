// ==========================================================
//  ♾️ avatar-core.schema.ts | Avatar Engine™ Core Schema 🧠
// ==========================================================
// 🧠 Purpose:
// Base identity, progression, and branding fields for all avatars.
//
// 🔌 Usage:
// - Extended by avatar.schema.ts
// - Used across multi-tenant app instances
//
// 🛠 Tools Used:
// - NestJS @Schema / @Prop decorators
// - Mongoose ODM
// ==========================================================

import * as mongoose from 'mongoose';
import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class AvatarCore {
  // 🧍‍♂️ Unique display name for the avatar
  @Prop({ required: true, unique: true })
  name: string;

  // 🧩 Classification (e.g., "function-fighter", "mentor-bot")
  @Prop({ required: true })
  type: string;

  // 🏷️ URL-friendly identifier
  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  slug: string;

  // 🎨 Teaching / personality style (controls AI tone or humor)
  @Prop({
    type: String,
    enum: [
      'metaphorical',
      'mnemonic',
      'visual',
      'logical',
      'cartoon',
      'cyberpunk',
      'futuristic',
      'default',
    ],
    default: 'default',
  })
  style: string;

  // 🧱 Current power level (increases with XP)
  @Prop({ default: 1 })
  level: number;

  // ⚡ Experience points toward next level
  @Prop({ default: 0 })
  xp: number;

  // 🏅 List of badge IDs this avatar has earned
  @Prop({ type: [String], default: [] })
  badgesUnlocked: string[];

  // 💎 Drop rarity classification
  @Prop({ default: 'common' })
  rarity: 'common' | 'rare' | 'epic' | 'legendary';

  // 🔓 Whether this avatar is available by default
  @Prop({ default: false })
  unlockedByDefault: boolean;

  // 🌐 Tenant-specific overrides for multi-app instances
  @Prop({ type: Map, of: mongoose.Schema.Types.Mixed, default: {} })
  tenantOverrides?: Record<string, Partial<AvatarCore>>;

  // 🔱 Official crest symbol (defaults to Infinity Crest)
  @Prop({ default: '{♾️}' })
  crestSymbol: string;

  // 🖼️ Image or portrait URL for UI display
  @Prop()
  avatarImageUrl: string;

  // 🎵 Theme or background music file
  @Prop()
  themeMusic: string;

  // 🎮 Triggered animations (e.g., “login”, “level-up”)
  @Prop({ type: Object, default: {} })
  activationHooks: Record<string, string>;

  // 🧩 Sprite or frame map for front-end rendering
  @Prop({ type: Object, default: {} })
  spriteMap: Record<string, string>;
}
