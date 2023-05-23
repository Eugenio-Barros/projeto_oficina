import { Request, Response } from 'express';
import { update, detail } from '../../services/cars';

export default async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!(await detail(id))) {
    return res.status(404).json({
      code: 404,
      message: 'Car not found',
    });
  }

  const car = await update(id, req.body);
  return res.json(car);
};
