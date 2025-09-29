// ==========================
//  db.ts 🧠
// ==========================
//  Connects to MongoDB using Mongoose
//  Loads credentials securely from .env
//  🔌 Used in main.ts/bootstrap for app startup
// ==========================

import mongoose from 'mongoose';
import * as dotenv from 'dotenv';


dotenv.config();  // Load env vars

// 🕵️ Sanity checks for required .env values (optional but helpful in dev)
if (!process.env.MONGO_URI) console.warn('⚠️ Missing base MONGO_URI in .env');
if (!process.env.DB_USER) console.warn('⚠️ DB_USER missing');
if (!process.env.DB_PASSWORD) console.warn('⚠️ DB_PASSWORD missing');
if (!process.env.DB_NAME) console.warn('⚠️ DB_NAME missing');
if(!process.env.DB_CLUSTER) console.warn('⚠️ DB_CLUSTER missing');

//  Build full MongoDB connection string by injecting secrets from .env
const MONGO_URI = process.env.MONGO_URI?.replace(
  '${DB_USER}',
  process.env.DB_USER || '', // Inject DB username
)
  .replace(
    '${DB_PASSWORD}',
    process.env.DB_PASSWORD || '', // Inject DB password
  )
  .replace(
    '${DB_NAME}',
    process.env.DB_NAME || '', // Inject DB name
  );

//  Connect to MongoDB using Mongoose
export const connectDB = async () => {
  try {
   
    if (!MONGO_URI) throw new Error('MongoDB URI is not defined');

    await mongoose.connect(MONGO_URI); // 
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1); // 
  }
};
