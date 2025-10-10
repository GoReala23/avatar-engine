// ==========================================================
//  ♾️ avatar.schema.ts | Avatar Engine™ Master Schema 🔗
// ==========================================================
// 🧠 Purpose:
// Combines AvatarCore with optional modules (voice, humor, etc.)
// to form the complete Avatar model.
//
// 🔌 Usage:
// - Imported into services/controllers for CRUD
// - Registered via MongooseModule.forFeature([{ name: Avatar.name, schema: AvatarSchema }])
//
// 🛠 Tools Used:
// - Mongoose (MongoDB ODM)
// - NestJS Schema decorators
//
// 📦 Features:
// - Core identity & progression (from AvatarCore)
// - Voice profiles (subdocument array)
// - Humor profile + quotes
// - AI-powered toggle
// ==========================================================

import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';             // ✅ preferred over Document
import { AvatarCore } from './avatar-core.schema';
import { VoiceProfileSchema } from './avatar-voice.schema'; // ✅ make sure these are exported

export type AvatarDocument = HydratedDocument<Avatar>;

@Schema({ timestamps: true })
export class Avatar extends AvatarCore {
  // 🤖 Whether this avatar uses AI responses (global toggle)
  @Prop({ default: true })
  aiPowered: boolean;

  // 🏃 Action keywords this avatar can perform (UI/animation hooks)
  @Prop({ type: [String], default: [] })
  actions: string[];

  // 🧑‍🏫 Coaching styles (high-level tags; different from `style` in AvatarCore)
  @Prop({ type: [String], default: [] })
  coachingStyle: string[];

  // 😶‍🌫️ Words/contexts that trigger specific emotional responses
  @Prop({ type: [String], default: [] })
  emotionTriggers: string[];

  // 😂 Humor persona key (maps to Humor Engine profile)
  @Prop()
  humorProfile: string;

  // 🗣️ Favorite one-liners / quotes surfaced by Humor Engine or UI
  @Prop({ type: [String], default: [] })
  quotes: string[];

  // 🎙️ Voice profiles (subdocuments with emotion clips, etc.)
  @Prop({ type: [VoiceProfileSchema], default: [] })
  voiceProfiles: any[];

  // 🔔 Default voice profile name to use when none specified
  @Prop({ default: 'standard' })
  defaultVoiceProfile: string;

  // 🎚️ Quick lookup for emotion → audio clip URL (optional)
  @Prop({ type: Map, of: String, default: {} })
  voiceClips?: { [emotion: string]: string };
}

export const AvatarSchema = SchemaFactory.createForClass(Avatar);
