import { Request, Response } from 'express';
import { update, detail } from '../../services/user';

export default async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!(await detail(id))) {
    return res.status(404).json({
      code: 404,
      message: 'User not found',
    });
  }

  const user = await update(id, req.body);
  return res.json(user);
};
