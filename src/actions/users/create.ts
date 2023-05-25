import { Request, Response } from "express";
import { create } from "../../services/user";
import { UsersInfo } from "../../models/user";

export default async (req: Request, res: Response) => {
  const { ...user }: UsersInfo = req.body;

  const newUser = await create(user);

  return res.json(newUser);
};
