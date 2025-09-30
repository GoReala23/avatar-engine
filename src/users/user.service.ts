// ==========================================================
//  ♾️ user.service.ts | User Service Layer 🧑‍💻
// ==========================================================
// 🧠 Purpose:
// Business logic for user CRUD, bonds, settings, and AI responses.
//
// 🔌 Usage:
// - Injected into UsersController and AuthService
//
// 📦 Features:
// - Create, read, update, delete users
// - Secure password change
// - Bond management (points, levels, humor settings)
// - Avatar-style AI responses (adaptive to context)
// ==========================================================

import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, HydratedDocument } from 'mongoose';
import { User } from './user.model';
import * as bcrypt from 'bcryptjs';

// Use HydratedDocument<User> directly
export type UserDoc = HydratedDocument<User>;

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDoc>,
  ) {}

  // ==========================================================
  // 🟢 CREATE METHODS
  // ==========================================================

  async createUser(data: Partial<User>): Promise<UserDoc> {
    const newUser = new this.userModel(data);
    const saved = await newUser.save();
    return saved as unknown as UserDoc;
  }

  // ==========================================================
  // 🔍 READ METHODS
  // ==========================================================

  async findById(id: string): Promise<UserDoc> {
    return this.getUserById(id);
  }

  async findByEmail(email: string): Promise<UserDoc | null> {
    const user = await this.userModel.findOne({ email }).exec();
    return user as unknown as UserDoc | null;
  }

  async findAll(): Promise<UserDoc[]> {
    const users = await this.userModel.find().exec();
    return users as unknown as UserDoc[];
  }

  private async getUserById(id: string): Promise<UserDoc> {
    const user = await this.userModel.findById(id).exec();
    if (!user) throw new NotFoundException('User not found');
    return user as unknown as UserDoc;
  }

  // ==========================================================
  // 🛠 UPDATE METHODS
  // ==========================================================

  async updateUser(id: string, updates: Partial<User>): Promise<UserDoc | null> {
    const updateData = { ...updates };

    if (updateData.password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(updateData.password, salt);
    }

    const updated = await this.userModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
    return updated as unknown as UserDoc | null;
  }

  async updateUserBySlug(slug: string, updates: Partial<User>): Promise<UserDoc | null> {
    const updateData = { ...updates };

    if (updateData.password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(updateData.password, salt);
    }

    const updated = await this.userModel.findOneAndUpdate({ slug }, updateData, { new: true }).exec();
    return updated as unknown as UserDoc | null;
  }

  async updateUserRole(id: string, role: User['role']): Promise<UserDoc | null> {
    const updated = await this.userModel.findByIdAndUpdate(id, { role }, { new: true }).exec();
    return updated as unknown as UserDoc | null;
  }

  async updateSettings(id: string, settings: Partial<User['appSettings']>): Promise<UserDoc> {
    const user = await this.getUserById(id);
    user.appSettings = { ...user.appSettings, ...settings };
    return (await user.save()) as unknown as UserDoc;
  }

  async changePassword(userId: string, oldPassword: string, newPassword: string): Promise<UserDoc> {
    const user = await this.getUserById(userId);

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Old password is incorrect');
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    return (await user.save()) as unknown as UserDoc;
  }

  // ==========================================================
  // ❌ DELETE METHODS
  // ==========================================================

  async deleteUser(id: string): Promise<UserDoc | null> {
    await this.getUserById(id);
    const deleted = await this.userModel.findByIdAndDelete(id).exec();
    return deleted as unknown as UserDoc | null;
  }

  // ==========================================================
  // 🤝 BOND METHODS
  // ==========================================================

  async addBond(userId: string, fighterId: string): Promise<UserDoc> {
    const user = await this.getUserById(userId);
    user.fighterBonds.set(fighterId, {
      bondLevel: 1,
      bondPoints: 0,
      humorLevel: 0,
    });
    return (await user.save()) as unknown as UserDoc;
  }

  async increaseBondPoints(userId: string, fighterId: string, points: number): Promise<UserDoc> {
    const user = await this.getUserById(userId);
    const bond = user.fighterBonds.get(fighterId);
    if (!bond) throw new NotFoundException('Bond not found');

    bond.bondPoints += points;

    while (bond.bondPoints >= 100 * bond.bondLevel) {
      bond.bondPoints -= 100 * bond.bondLevel;
      bond.bondLevel += 1;
    }

    user.fighterBonds.set(fighterId, bond);
    return (await user.save()) as unknown as UserDoc;
  }

  async setHumorLevel(userId: string, fighterId: string, humorLevel: number): Promise<UserDoc> {
    const user = await this.getUserById(userId);
    const bond = user.fighterBonds.get(fighterId);
    if (!bond) throw new NotFoundException('Bond not found');

    bond.humorLevel = humorLevel;
    user.fighterBonds.set(fighterId, bond);

    return (await user.save()) as unknown as UserDoc;
  }

  // ==========================================================
  // 🤖 AI METHODS
  // ==========================================================

  async generateAIResponseForAvatar(slug: string, context: string): Promise<string> {
    const fighter = await this.findBySlug(slug);
    const name = fighter.name;
    const style = fighter.style;

    const intro = {
      metaphorical: `Greetings! I am ${name}, your metaphorical mentor.`,
      mnemonic: `Hello! I'm ${name}, here to help you remember concepts.`,
      visual: `Hi! I'm ${name}, your visual guide.`,
      logical: `Hello! I'm ${name}, your logical assistant.`,
      cartoon: `Hey there! I'm ${name}, your friendly cartoon avatar!`,
      cyberpunk: `Greetings, human. I am ${name}, your digital guide.`,
      futuristic: `Hello, human. I am ${name}, your futuristic companion.`,
      default: `Hi! I'm ${name}, your avatar.`,
    }[style] || `Hi! I'm ${name}, your avatar.`;

    return `${intro} I'm here to help you with ${context}. How can I assist you today?`;
  }

  private async findBySlug(slug: string): Promise<{ name: string; style: string }> {
    return {
      name: 'TempFighter',
      style: 'default',
    };
  }

  // ==========================================================
  // 🟣 HELPER METHODS
  // ==========================================================

  async hasUnlockedAvatar(userId: string, slug: string): Promise<boolean> {
    const user = await this.getUserById(userId);
    return !!(user.fighterBonds && user.fighterBonds.has(slug));
  }
}
