import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const connectToDatabase = async () => {
  try {
    await prisma.$connect();
    console.log('Connected to database');
  } catch (err) {
    console.error('Database connection error:', err);
    throw err;
  }
};

export default prisma;