import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@ganzaproperty.com" },
    update: { passwordHash: hashedPassword, role: "admin" },
    create: {
      email: "admin@ganzaproperty.com",
      name: "Admin User",
      passwordHash: hashedPassword,
      role: "admin",
    },
  });

  res.status(200).json({ message: "Admin created", admin });
}
