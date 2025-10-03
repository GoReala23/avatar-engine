// ==========================================================
// ♾️ user.controller.ts | Users Controller 🎮
// ==========================================================
// 🧠 Purpose: Defines REST API routes for user management.
// 🔌 Routes: /users, /users/:id (GET, PATCH)
// 🛠 Tools: UsersService, DTOs, future guards (JWT/Roles)
// ==========================================================


import { Controller, Get, Param, Patch, Body } from '@nestjs/common';
import { UsersService } from './user.service';
import { AdminUpdateUserDto } from './dto/admin-update-user.dto';

@Controller('users') // Base route = /users
export class UsersController {
  constructor(private readonly usersService: UsersService) {} // Inject service

  @Get() // GET /users
  findAll() {
    // MVP stub: later call this.usersService.findAll()
    return 'All users (stub)';
  }

  @Get(':id') // GET /users/:id
  findOne(@Param('id') id: string) {
    // MVP stub: later call this.usersService.findById(id)
    return `User ${id} (stub)`;
  }

  @Patch(':id') // PATCH /users/:id
  update(@Param('id') id: string, @Body() dto: AdminUpdateUserDto) {
    // MVP stub: later call this.usersService.updateUser(id, dto)
    return { message: `Updated user ${id} (stub)`, dto };
  }
}
