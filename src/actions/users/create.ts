import { Request, Response } from "express";
import { create } from "../../services/user";
import { UserInfo } from "../../models/user";

export default async (req: Request, res: Response) => {
  const { ...user }: UserInfo = req.body;

  const newUser = await create(user);

  return res.json(newUser);
};
