// ------------------ Imports ------------------
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';

// ------------------ User Document ------------------
export type UserDocument = HydratedDocument<User>;  // 👈 FIX

// ------------------ Role Enum ------------------
export enum UserRole {
  USER = 'user',
  MOD = 'mod',
  ADMIN = 'admin',
}

// ------------------ Subschemas ------------------
@Schema({ _id: false })
export class FighterBond {
  @Prop({ required: true, default: 1 })
  bondLevel: number;

  @Prop({ required: true, default: 0 })
  bondPoints: number;

  @Prop()
  humorLevel?: number;
}
const FighterBondSchema = SchemaFactory.createForClass(FighterBond);

@Schema({ _id: false })
export class AppSettings {
  @Prop({ default: 'light' })
  theme?: string;

  @Prop({ default: false })
  accessibilityMode?: boolean;
}
const AppSettingsSchema = SchemaFactory.createForClass(AppSettings);

// ------------------ Main User Schema ------------------
@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: UserRole.USER })
  role: UserRole;

  @Prop({ default: '' })
  displayName?: string;

  @Prop({ type: [String], default: [] })
  favoriteAvatars?: string[];

  @Prop({ type: Map, of: FighterBondSchema, default: {} })
  fighterBonds?: Map<string, FighterBond>;

  @Prop({ default: '' })
  preferredVoice?: string;

  @Prop({ type: [String], default: [] })
  unlockedBadges?: string[];

  @Prop({ type: [String], default: [] })
  skillHistory?: string[];

  @Prop({ type: AppSettingsSchema, default: {} })
  appSettings?: AppSettings;
}

// ------------------ Schema & Hooks ------------------
const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<UserDocument>('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export { UserSchema };
