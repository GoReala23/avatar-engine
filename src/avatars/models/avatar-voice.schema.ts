// ==========================================================
//  ♾️ avatar-voice.schema.ts | Avatar Engine™ Voice Module 🎙️
// ==========================================================
// 🧠 Purpose:
// Defines sub-schema for multi-voice support with accents and
// emotion-based audio clips.
//
// 🔌 Usage:
// - Imported into master schema (avatar.schema.ts)
// - Used by TTS systems, AI bots, games
//
// 🛠 Tools Used:
// - Mongoose (MongoDB ORM)
//
// 📦 Features:
// - Multiple named voice profiles
// - Emotion-based audio clip mapping
// - Default fallback clip
// ==========================================================

import * as mongoose from 'mongoose';

export const VoiceProfileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    accent: { type: String, default: '' },
    emotionClips: {
      excited: { type: String, default: '' },
      confused: { type: String, default: '' },
      mad: { type: String, default: '' },
      thoughtful: { type: String, default: '' },
      chill: { type: String, default: '' },
    },
    defaultClip: { type: String, default: '' },
  },
  { _id: false }
);
