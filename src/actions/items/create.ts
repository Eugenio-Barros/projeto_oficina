import { Request, Response } from 'express';
import { create } from '../../services/items';
import { Item } from '../../models/Item';

export default async (req: Request, res: Response) => {
  const { ...item }: Item = req.body;

  const newItem = await create(item);

  return res.json(newItem);
};
