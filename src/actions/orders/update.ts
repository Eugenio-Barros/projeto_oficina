import { Request, Response } from 'express';
import { update, detail } from '../../services/orders';
import { Order, OrderData } from '../../models/order';

export default async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...newOrderData }: Order = req.body;
  const { car, user, items }: OrderData = req.body;

  if (!(await detail(id))) {
    return res.status(404).json({
      code: 404,
      message: 'Order not found',
    });
  }

  const updatedOrder = await update(newOrderData, id, car, user, items);
  return res.json(updatedOrder);
};
