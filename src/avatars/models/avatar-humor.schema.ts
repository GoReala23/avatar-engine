// ==========================================================
//  ♾️ avatar-humor.schema.ts | Avatar Engine™ Humor Module 😂
// ==========================================================
// 🧠 Purpose:
// Defines humor-related fields for avatars.
//
// 🔌 Usage:
// - Imported into master schema (avatar.schema.ts)
// - Used by Humor Engine™ or AI-based banter systems
//
// 🛠 Tools Used:
// - Mongoose (MongoDB ORM)
//
// 📦 Features:
// - Humor profile type
// - List of quotes/banter lines
// ==========================================================

import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class AvatarHumor {
  @Prop()
  humorProfile: string;

  @Prop({ type: [String], default: [] })
  quotes: string[];
}

