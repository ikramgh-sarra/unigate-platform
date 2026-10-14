import "dotenv/config";
// @ts-ignore
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
// @ts-ignore
import { PrismaClient } from "@prisma/client";

const adapter = new PrismaMariaDb({
  // @ts-ignore
  host: process.env.DATABASE_HOST || "localhost",
  // @ts-ignore
  user: process.env.DATABASE_USER || "root",
  // @ts-ignore
  password: process.env.DATABASE_PASSWORD || "",
  // @ts-ignore
  database: process.env.DATABASE_NAME || "",
  connectionLimit: 5,
});

// @ts-ignore
const prisma = new PrismaClient({ adapter });

export { prisma };