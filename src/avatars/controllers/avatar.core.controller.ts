// ==========================================================
//  ♾️ avatar-core.controller.ts | Avatar Engine™ API 🎮
// ==========================================================
// 🧠 Purpose:
// Handles all REST API endpoints for avatar management.
// Serves as the interface between client requests and
// the AvatarCoreService.
//
// 🔌 Usage:
// - Public:    GET avatars by slug, style, or rarity
// - Admin:     Create, delete, unlock, or reset avatars
// - Auth User: Update XP or personal avatar data
//
// 🛠 Tools Used:
// - NestJS Decorators (@Controller, @Get, @Post, etc.)
// - Guards: JwtAuthGuard + RolesGuard
// - DTO Validation (class-validator)
// - UsersService (bond/unlock checks)
// - Swagger decorators (commented until Sprint 5)
//
// 📦 Features:
// - CRUD endpoints
// - XP progression
// - Unlock/reset flows
// - AI dialogue endpoint (bond validation)
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
// import { ApiTags } from '@nestjs/swagger'; // enabled in Sprint 5
import { AvatarCoreService } from '../services/avatar.core.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/roles.decorator';
import { UserRole } from '../../users/user.model';
import { CreateAvatarDto } from '../dto/create-avatar.dto';
import { AddXpDto } from '../dto/add-xp.dto';
import { UnlockAvatarDto } from '../dto/unlock-avatar.dto';
import { AdminUpdateAvatarDto } from '../dto/admin-update-avatar.dto';
import { UserUpdateAvatarDto } from '../dto/user-update-avatar.dto';
import { UsersService } from '../../users/user.service';

// @ApiTags('Avatars')
@Controller('avatars')
export class AvatarCoreController {
  constructor(
    private readonly avatarService: AvatarCoreService,
    private readonly usersService: UsersService,
  ) {}

  // ======================================================
// 🟢 READ (GET)
// ======================================================

/** 
 * 🧾 Returns all avatars (public). 
 * Optional future: add pagination or query filters.
 */
@Get()
async getAll() {
  const avatars = await this.avatarService.findAll();
  return {
    count: avatars.length,
    avatars,
  };
}

/**
 * 🎨 Returns all avatars of a given teaching style.
 * Must come *before* the slug route to avoid conflict.
 */
@Get('style/:style')
async getByStyle(@Param('style') style: string) {
  const avatars = await this.avatarService.findByStyle(style as any);
  
  return {
    count: avatars.length,
    avatars,
  };
}

/**
 * 💎 Returns all avatars with the given rarity tier.
 * Example: GET /avatars/rarity/legendary
 */
@Get('rarity/:tier')
async getByRarity(@Param('tier') tier: string) {
  const avatars = await this.avatarService.findByRarity(tier as any);
  return {
    count: avatars.length,
    avatars,
  };
}

/**
 * 🧍 Retrieves a single avatar by its slug.
 * Must come *after* style/rarity routes to avoid capture.
 */
@Get(':slug')
async getBySlug(@Param('slug') slug: string) {
  return this.avatarService.findBySlug(slug);
}


  // ======================================================
  // 🟡 CREATE  (POST)
  // ======================================================

  /** Admin-only: create a new avatar using validated DTO. */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  async create(@Body() createAvatarDto: CreateAvatarDto) {
    return this.avatarService.createAvatar(createAvatarDto);
  }

  // ======================================================
  // 🟠 UPDATE / PATCH
  // ======================================================

  /** Admin-only full update. */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch(':slug/admin-update')
  async adminUpdate(
    @Param('slug') slug: string,
    @Body() body: AdminUpdateAvatarDto,
  ) {
    return this.avatarService.updateAvatar(slug, body);
  }

  /** Authenticated user limited update. */
  @UseGuards(JwtAuthGuard)
  @Patch(':slug/user-update')
  async userUpdate(
    @Param('slug') slug: string,
    @Body() body: UserUpdateAvatarDto,
  ) {
    return this.avatarService.updateAvatar(slug, body);
  }

  /** Adds XP to an avatar (user-scoped). */
  @UseGuards(JwtAuthGuard)
  @Patch(':slug/add-xp')
  async addXP(@Param('slug') slug: string, @Body() addXpDto: AddXpDto) {
    return this.avatarService.addXP(slug, addXpDto.xp, addXpDto.tenantId);
  }

  /** Admin-only: resets avatar progression. */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch(':slug/reset')
  async reset(@Param('slug') slug: string) {
    return this.avatarService.resetAvatar(slug);
  }

  /** Admin-only: unlocks avatar manually (uses DTO). */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch(':slug/unlock')
  async unlock(
    @Param('slug') slug: string,
    @Body() unlockAvatarDto: UnlockAvatarDto,
  ) {
    return this.avatarService.unlockAvatar(
      slug,
      unlockAvatarDto?.tenantId || undefined,
    );
  }

  // ======================================================
  // 🤖 AI RESPONSE
  // ======================================================

  /** Generates contextual AI dialogue from an avatar. */
  @UseGuards(JwtAuthGuard)
  @Post(':slug/ai-response')
  async aiResponse(
    @Param('slug') slug: string,
    @Body('context') context: string,
    @Req() req,
  ) {
    const { _id: userId, role } = req.user;

    // Admins bypass bond validation
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

  // ======================================================
  // 🔴 DELETE
  // ======================================================

  /** Admin-only: permanently delete an avatar. */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':slug')
  async remove(@Param('slug') slug: string) {
    return this.avatarService.deleteAvatar(slug);
  }
}
