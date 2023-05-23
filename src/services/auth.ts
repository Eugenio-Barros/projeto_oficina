import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";

const prisma = new PrismaClient();

export async function register(login: string, password: string, name: string) {
  const user = await prisma.user.create({
    data: {
      login,
      password: await bcrypt.hash(password, 8),
      name,
    },
  });

  return createToken(user);
}

export const findById = async (user_id: string) =>
  prisma.user.findUnique({
    where: { user_id },
  });

export async function attemptLogin(login: string, password: string) {
  const user = await prisma.user.findFirst({
    where: {
      login,
      deleted: false,
    },
  });

  const match = user && (await bcrypt.compare(password, user.password));

  if (!user || !match) {
    throw new Error("Bad credentials");
  }

  return createToken(user);
}

function createToken(user: User): string {
  const token = sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 180,
      login: user.login,
      user_id: user.user_id,
    },
    "Secret"
  );

  return token;
}
