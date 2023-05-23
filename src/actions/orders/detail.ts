import { Request, Response } from 'express';
import { detail } from '../../services/orders';

export default async (req: Request, res: Response) => {
  const { id } = req.params;

  const order = await detail(id);

  if (!order) {
    return res.status(404).json({
      code: 404,
      message: 'Order not found',
    });
  }

  return res.json(order);
};
