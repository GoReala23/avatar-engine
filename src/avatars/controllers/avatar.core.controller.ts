// ==========================================================
//  ♾️ avatar-core.controller.ts | Avatar Engine™ API 🎮
// ==========================================================
// 🧠 Purpose:
// REST API endpoints for avatar management.
//
// 🔌 Usage:
// - Public: GET avatars by slug, style, rarity
// - Admin: Create, delete, unlock, reset
// - Users: Update their fighter’s actions, humor, etc.
// - AI Responses gated by bond/unlock system
//
// 🛠 Tools Used:
// - AvatarCoreService
// - UsersService (bond/unlock checks)
// - DTO validation via class-validator
// - JWT + RolesGuard for role protection
//
// 📦 Features:
// - CRUD endpoints
// - XP and progression
// - Unlock/reset flows
// - AI avatar dialogue (with bond validation)
// ==========================================================

import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AvatarCoreService } from '../services/avatar.core.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/roles.decorator';
import { UserRole } from '../../users/user.model';
import { CreateAvatarDto } from '../dto/create-avatar.dto';
import { AdminUpdateAvatarDto } from '../dto/admin-update-avatar.dto';
import { UserUpdateAvatarDto } from '../dto/user-update-avatar.dto';
import { UsersService } from '../../users/user.service';

@ApiTags('Avatars')
@Controller('avatars')
export class AvatarCoreController {
  constructor(
    private readonly avatarService: AvatarCoreService,
    private readonly usersService: UsersService,
  ) {}

  // ===========================
  // 🟢 GET Endpoints
  // ===========================

  @Get()
  async getAll() {
    return this.avatarService.findAll();
  }

  @Get(':slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.avatarService.findBySlug(slug);
  }

  @Get('style/:style')
  async getByStyle(@Param('style') style: string) {
    return this.avatarService.findByStyle(style);
  }

  @Get('rarity/:tier')
  async getByRarity(@Param('tier') tier: string) {
    return this.avatarService.findByRarity(tier as any);
  }

  // ===========================
  // 🟡 POST Endpoints
  // ===========================

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  async create(@Body() body: CreateAvatarDto) {
    return this.avatarService.createAvatar(body);
  }

  // ===========================
  // 🟠 PATCH Endpoints
  // ===========================

  // 🔧 Admin update
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch(':slug/admin-update')
  async adminUpdate(
    @Param('slug') slug: string,
    @Body() body: AdminUpdateAvatarDto,
  ) {
    return this.avatarService.updateAvatar(slug, body);
  }

  // 🔧 User update (limited fields)
  @UseGuards(JwtAuthGuard)
  @Patch(':slug/user-update')
  async userUpdate(
    @Param('slug') slug: string,
    @Body() body: UserUpdateAvatarDto,
  ) {
    return this.avatarService.updateAvatar(slug, body);
  }

  // ➕ Add XP
  @UseGuards(JwtAuthGuard)
  @Patch(':slug/add-xp')
  async addXP(@Param('slug') slug: string, @Body('xp') xp: number) {
    return this.avatarService.addXP(slug, xp);
  }

  // 🔄 Reset
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch(':slug/reset')
  async reset(@Param('slug') slug: string) {
    return this.avatarService.resetAvatar(slug);
  }

  // 🔓 Unlock
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch(':slug/unlock')
  async unlock(@Param('slug') slug: string) {
    return this.avatarService.unlockAvatar(slug);
  }

  // ===========================
  // 🤖 AI Response Endpoint
  // ===========================

  @UseGuards(JwtAuthGuard)
  @Post(':slug/ai-response')
  async aiResponse(
    @Param('slug') slug: string,
    @Body('context') context: string,
    @Req() req,
  ) {
    const userId = req.user._id;
    const role = req.user.role;

    // 🛡️ Admins bypass bond checks
    if (role !== UserRole.ADMIN) {
      const hasBond = await this.usersService.hasUnlockedAvatar(userId, slug);
      if (!hasBond) {
        throw new ForbiddenException(
          `You have not unlocked or bonded with "${slug}" yet.`,
        );
      }
    }

    return this.avatarService.generateAIResponseForAvatar(slug, context);
  }

  // ===========================
  // 🔴 DELETE Endpoints
  // ===========================

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':slug')
  async remove(@Param('slug') slug: string) {
    return this.avatarService.deleteAvatar(slug);
  }
}
