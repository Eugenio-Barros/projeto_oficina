import { Request, Response } from 'express';
import { create } from '../../services/orders';
import { Order } from '../../models/order';
import { OrderData } from '../../models/order';

export default async (req: Request, res: Response) => {
  const { ...order }: Order = req.body;
  const { user, car, items }: OrderData = req.body;

  const newOrder = await create(order, car, user, items);

  return res.json(newOrder);
};
