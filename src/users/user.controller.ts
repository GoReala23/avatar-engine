// ==========================================================
// ♾️ user.controller.ts | Users Controller 🎮
// ==========================================================
// 🧠 Purpose:
// Defines REST API routes for user management and admin actions.
// Secures routes via JWT guard.
//
// 🔌 Routes:
// - GET /users → returns all users (admin-only)
// - GET /users/:id → returns one user by ID
// - PATCH /users/:id → update user info
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
  // 🔒 GET ALL USERS (Admin Only)
  // ==========================================================
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

  // ==========================================================
  // 🧠 GET USER BY ID
  // ==========================================================
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findById(id);
    if (!user) throw new NotFoundException(`User ${id} not found`);
    const { password, ...safe } = user.toObject ? user.toObject() : user;
    return safe;
  }

  // ==========================================================
  // 🛠 UPDATE USER (Admin Action)
  // ==========================================================
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
}
