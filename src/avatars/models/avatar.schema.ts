// ==========================================================
//  ♾️ avatar.schema.ts | Avatar Engine™ Master Schema 🔗
// ==========================================================
// 🧠 Purpose:
// Combines AvatarCore with optional modules (voice, humor, etc.)
// to form the complete Avatar model.
//
// 🔌 Usage:
// - Imported into services/controllers for CRUD
// - Acts as Mongoose model for the Avatar Engine™
//
// 🛠 Tools Used:
// - Mongoose (MongoDB ORM)
// - NestJS Schema decorators
//
// 📦 Features:
// - Core identity & progression
// - Voice profiles
// - Humor system
// - AI-powered toggle
// ==========================================================

import { SchemaFactory, Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AvatarCore } from './avatar-core.schema';
import { VoiceProfileSchema } from './avatar-voice.schema';

export type AvatarDocument = Avatar & Document;

@Schema({ timestamps: true })
export class Avatar extends AvatarCore {
  // 🤖 AI Toggle
  @Prop({ default: true })
  aiPowered: boolean;

  // 🏃 Actions & Styles
  @Prop({ type: [String], default: [] })
  actions: string[];

  @Prop({ type: [String], default: [] })
  coachingStyle: string[];

  @Prop({ type: [String], default: [] })
  emotionTriggers: string[];

  // 😂 Humor
  @Prop()
  humorProfile: string;

  @Prop({ type: [String], default: [] })
  quotes: string[];

  // 🎙️ Voice
  @Prop({ type: [VoiceProfileSchema], default: [] })
  voiceProfiles: Array<{
    name: string;
    accent?: string;
    emotionClips: Record<string, string>;
    defaultClip?: string;
  }>;

  @Prop({ default: 'standard' })
  defaultVoiceProfile: string;

  @Prop({ type: Map, of: String, default: {} })
  voiceClips?: { [emotion: string]: string };
}

export const AvatarSchema = SchemaFactory.createForClass(Avatar);
