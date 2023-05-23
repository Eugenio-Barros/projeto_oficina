import { Request, Response } from "express";
import { list } from "../../services/user";

export default async (_: Request, res: Response) => {
  res.json(await list());
};
