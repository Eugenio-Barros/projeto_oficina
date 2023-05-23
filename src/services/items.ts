import { PrismaClient } from "@prisma/client";
import { Item } from "../models/Item";

export const prisma = new PrismaClient();

const create = (item: Item) =>
  prisma.item.create({
    data: {
      ...item,
    },
  });

const update = (id: string, item: Item) =>
  prisma.item.update({
    where: { item_id: id },
    data: { ...item },
  });

const remove = (id: string) =>
  prisma.item.update({
    where: {
      item_id: id,
    },
    data: {
      deleted: true,
    },
  });

const list = () =>
  prisma.item.findMany({
    where: {
      deleted: false,
    },
  });

const detail = (item_id: string) =>
  prisma.item.findFirst({
    where: {
      item_id,
      deleted: false,
    },
  });

export { create, detail, update, remove, list };
