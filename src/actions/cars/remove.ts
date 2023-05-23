import { Request, Response } from 'express';
import { remove, detail } from '../../services/cars';

export default async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!(await detail(id))) {
    return res.status(404).json({
      code: 404,
      message: 'Car not found',
    });
  }

  await remove(id);
  return res.json();
};
