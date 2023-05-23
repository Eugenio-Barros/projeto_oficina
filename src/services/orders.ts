import { PrismaClient } from "@prisma/client";
import { Order } from "../models/order";

export const prisma = new PrismaClient();

const list = () =>
  prisma.order.findMany({
    where: {
      deleted: false,
    },
  });

const detail = (order_id: string) =>
  prisma.order.findFirst({
    where: {
      order_id,
      deleted: false,
    },
    include: {
      car: true,
      items: true,
    },
  });

const create = async (
  order: Order,
  car_id: string,
  user_id: string,
  item_ids: string[]
) => {
  const items = await prisma.item.findMany({
    where: {
      item_id: { in: item_ids },
    },
  });

  const total = items.reduce((sum, item) => sum + item.value, 0);

  const newOrder = await prisma.order.create({
    data: {
      ...order,
      total: total,
      car: {
        connect: { car_id: car_id },
      },
      user: {
        connect: { user_id: user_id },
      },
      items: {
        connect: item_ids.map((item) => ({ item_id: item })),
      },
    },
    include: {
      items: true,
    },
  });
  return newOrder;
};

const update = async (
  newOrderData: Order,
  order_id: string,
  car_id: string,
  user_id: string,
  item_ids: string[]
) => {
  const items = await prisma.item.findMany({
    where: {
      item_id: { in: item_ids },
    },
  });

  const updatedTotal = items.reduce((sum, item) => sum + item.value, 0);

  const updatedOrder = await prisma.order.update({
    where: {
      order_id,
    },

    data: {
      ...newOrderData,
      total: updatedTotal,
      car: {
        connect: { car_id: car_id },
      },
      user: {
        connect: { user_id: user_id },
      },
      items: {
        connect: item_ids.map((item) => ({ item_id: item })),
      },
    },
    include: {
      items: true,
    },
  });
  return updatedOrder;
};

const remove = (order_id: string) => {
  prisma.order.update({
    where: { order_id },
    data: {
      deleted: true,
    },
  });
};

export { list, detail, create, update, remove };
