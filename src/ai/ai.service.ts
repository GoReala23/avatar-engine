// ================================================
// ai.service.ts
// Purpose: Handles AI-generated responses for avatars
// Why: Central layer between Avatar Engine™ and Humor Engine™
// ================================================

import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);

  async generateForAvatar(name: string, style: string, context: string): Promise<string> {
    // 🔹 Replace with Humor Engine integration later
    const intros = {
      metaphorical: `Greetings! I am ${name}, your metaphorical mentor.`,
      mnemonic: `Hello! I'm ${name}, here to help you remember things better!`,
      visual: `Hi! I'm ${name}, your visual guide.`,
      logical: `Hello! I'm ${name}, your logical assistant.`,
      cartoon: `Hey there! I'm ${name}, your friendly cartoon avatar!`,
      cyberpunk: `Greetings, human. I am ${name}, your digital guide.`,
      futuristic: `Hello, human. I am ${name}, your futuristic companion.`,
      default: `Hi! I'm ${name}, your avatar.`,
    };
    const intro = intros[style] || intros.default;

    this.logger.log(`AI generated response for ${name}`);
    return `${intro} I'm here to help you with ${context}. How can I assist you today?`;
  }
}

