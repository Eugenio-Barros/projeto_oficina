import { Request, Response } from 'express';
import { detail } from '../../services/cars';

export default async (req: Request, res: Response) => {
  const { id } = req.params;

  const car = await detail(id);

  if (!car) {
    return res.status(404).json({
      code: 404,
      message: 'Car not found',
    });
  }

  return res.json(car);
};
