// ==========================================================
// ♾️ user.module.ts | Users Module 👥
// ==========================================================
// 🧠 Purpose: Wires user schema, service, and controller.
// 🔌 Usage: Imported by AppModule, exports UsersService.
// 🛠 Tools: NestJS Modules, Mongoose ODM
// ==========================================================


import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.model';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],        // will add Mongoose schema later
  // Attach controller for Api endpoints
  controllers: [UsersController],
  // Attach service for business logic
  providers: [UsersService],
  // Export service so Auth/Avatars can use it
  exports: [UsersService],
})
export class UsersModule {}
