// ==========================================================
//  ♾️ user.controller.ts | Users API 👤
// ==========================================================
// 🧠 Purpose:
// REST API endpoints for user management.
//
// 🔌 Usage:
// - Register new accounts
// - Fetch profile info
// - Update settings, roles, and passwords
//
// 🛠 Tools Used:
// - UsersService
// - JWT + RolesGuard for protection
//
// 📦 Features:
// - Public registration
// - Protected profile routes
// - Admin-only: list, update, delete
// - Password change (self-service)
// ==========================================================

import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
  Req,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from './user.model';
import { UpdateUserDto } from './dto/update-user.dto';
import { AdminUpdateUserDto } from './dto/admin-update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // ===========================
  // 🟢 GET Endpoints
  // ===========================

  // 👤 Current profile (JWT required)
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Req() req) {
    return this.usersService.findById(req.user.userId);
  }

  // 📋 Admin + Mod: list all users
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MOD)
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  // 🔍 Admin + Mod: get user by ID
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MOD)
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  // ===========================
  // 🟡 POST Endpoints
  // ===========================

  // 🆕 Public registration
  @Post('register')
  async register(
    @Body() body: { email: string; password: string; displayName?: string },
  ) {
    return this.usersService.createUser({
      ...body,
      role: UserRole.USER, // ✅ Always default
    });
  }

  // ===========================
  // 🟠 PATCH Endpoints
  // ===========================

  // 🛠 Update own profile (JWT required)
  @UseGuards(JwtAuthGuard)
  @Patch('me')
  async updateProfile(@Req() req, @Body() body: UpdateUserDto) {
    console.log('req.user:', req.user);
    const updated = await this.usersService.updateUser(req.user.userId, body);
    if (!updated) {
      throw new NotFoundException('User not found or update failed');
    }
    return updated;
  }

  // 🔑 Change own password (JWT required)
  @UseGuards(JwtAuthGuard)
  @Patch('me/change-password')
  async changePassword(@Req() req, @Body() body: ChangePasswordDto) {
    return this.usersService.changePassword(
      req.user.userId,
      body.oldPassword,
      body.newPassword,
    );
  }

  // 🔐 Admin-only: update user profile (not role/email)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch(':id/admin-update')
  async adminUpdateUser(
    @Param('id') id: string,
    @Body() body: AdminUpdateUserDto,
  ) {
    return this.usersService.updateUser(id, body);
  }

  // 🔐 Admin-only: update user role
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch(':id/role')
  async updateUserRole(
    @Param('id') id: string,
    @Body() body: { role: UserRole },
  ) {
    return this.usersService.updateUserRole(id, body.role);
  }

  // ===========================
  // 🔴 DELETE Endpoints
  // ===========================

  // ❌ Admin-only: delete user
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
