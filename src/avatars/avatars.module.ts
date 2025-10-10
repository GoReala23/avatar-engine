// ==========================================================
// ♾️ avatars.module.ts | Avatars Module ⚔️
// ==========================================================
// 🧠 Purpose:
// Stub for avatar management and progression system.
//
// 🛠 Tools Used:
// - NestJS Module Decorator
// ==========================================================
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AvatarCoreController } from './controllers/avatar.core.controller';
import { AvatarCoreService } from './services/avatar.core.service';
import { Avatar, AvatarSchema } from './models/avatar.schema';
import { UsersModule } from 'src/users/user.module';
import { AiModule } from 'src/ai/ai.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Avatar.name, schema: AvatarSchema }]), UsersModule, AiModule],
  controllers: [AvatarCoreController],
  providers: [AvatarCoreService],
  exports: [AvatarCoreService],
})
export class AvatarsModule {}
