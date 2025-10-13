// ==========================================================
// ♾️ user.controller.ts | Users Controller 🎮
// ==========================================================
// 🧠 Purpose:
// Defines REST API routes for user management and admin actions.
// Secures routes via JWT guard.
//
// 🔌 Routes:
// ─── User-Level ─────────────────────────────────────────────
// - GET /users/:id → returns one user by ID
// - PATCH /users/:id → update user info
//
// ─── Admin-Level ───────────────────────────────────────────
// - GET /users → returns all users (admin-only)
// - PATCH /users/:id/role → admin role update
// - PATCH /users/:id/admin-update → admin info update
//
// 🛠 Tools Used:
// - UsersService (business logic layer)
// - JwtAuthGuard (route protection)
// - DTOs (AdminUpdateUserDto)
// ==========================================================

import {
  Controller,
  Get,
  Param,
  Patch,
  Body,
  UseGuards,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { AdminUpdateUserDto } from './dto/admin-update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // ==========================================================
  // 👤 USER-LEVEL ROUTES
  // ==========================================================

  // 🧠 GET USER BY ID
  // ----------------------------------------------------------
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findById(id);
    if (!user) throw new NotFoundException(`User ${id} not found`);
    const { password, ...safe } = user.toObject ? user.toObject() : user;
    return safe;
  }

  // 🛠 UPDATE USER (General Self Update)
  // ----------------------------------------------------------
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: AdminUpdateUserDto) {
    const updated = await this.usersService.updateUser(id, dto);
    if (!updated) throw new NotFoundException(`User ${id} not found`);
    const { password, ...safe } = updated.toObject ? updated.toObject() : updated;
    return {
      message: `✅ User ${id} updated successfully`,
      user: safe,
    };
  }

  // ==========================================================
  // 🛡️ ADMIN-LEVEL ROUTES
  // ==========================================================

  // 🔒 GET ALL USERS
  // ----------------------------------------------------------
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    try {
      const users = await this.usersService.findAll();
      if (!users.length) throw new NotFoundException('No users found.');
      return {
        count: users.length,
        users: users.map((u) => ({
          id: u._id,
          email: u.email,
          role: u.role,
          displayName: u.displayName,
          createdAt: u['createdAt'],
        })),
      };
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  // 🔑 ADMIN UPDATE USER ROLE
  // PATCH /users/:id/role
  // ----------------------------------------------------------
  @UseGuards(JwtAuthGuard)
  @Patch(':id/role')
  async updateRole(@Param('id') id: string, @Body() body: { role: string }) {
    const updated = await this.usersService.updateUserRole(id, body.role as any);
    if (!updated) throw new NotFoundException(`User ${id} not found`);
    return {
      message: `🔑 Role updated for user ${id}`,
      newRole: updated.role,
    };
  }

  // 🧩 ADMIN UPDATE USER INFO
  // PATCH /users/:id/admin-update
  // ----------------------------------------------------------
  @UseGuards(JwtAuthGuard)
  @Patch(':id/admin-update')
  async adminUpdate(@Param('id') id: string, @Body() dto: AdminUpdateUserDto) {
    const updated = await this.usersService.updateUser(id, dto);
    if (!updated) throw new NotFoundException(`User ${id} not found`);
    const { password, ...safe } = updated.toObject ? updated.toObject() : updated;
    return {
      message: `🛠️ Admin updated user ${id}`,
      user: safe,
    };
  }
}
