import { PrismaClient } from "@prisma/client";
import { UserInfo } from "../models/user";

export const prisma = new PrismaClient();

const create = (user: UserInfo) =>
  prisma.user.create({
    data: {
      ...user,
    },
  });

const update = (id: string, user: UserInfo) =>
  prisma.user.update({
    where: { user_id: id },
    data: { ...user },
  });

const remove = (id: string) =>
  prisma.user.update({
    where: {
      user_id: id,
    },
    data: {
      deleted: true,
    },
  });

const list = () =>
  prisma.user.findMany({
    where: {
      deleted: false,
    },
  });

const detail = (user_id: string) =>
  prisma.user.findFirst({
    where: {
      user_id,
      deleted: false,
    },
    include: {
      orders: true,
    },
  });

export { create, detail, update, remove, list };
