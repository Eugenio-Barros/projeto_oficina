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

//A função createToken recebe um objeto user como parâmetro e retorna uma string que representa um token de autenticação. O token é criado usando a função sign que recebe um payload contendo informações como a data de expiração (exp), o login do usuário (login), e o ID do usuário (user_id). O token é gerado com base nessas informações e uma chave secreta ("Secret"). O token resultante é então retornado pela função createToken.
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
