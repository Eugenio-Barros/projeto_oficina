import { Request, Response } from "express";
import { detail } from "../../services/items";

export default async (req: Request, res: Response) => {
  const { item_id } = req.params;

  const item = await detail(item_id);

  if (!item) {
    return res.status(404).json({
      code: 404,
      message: "User not found",
    });
  }

  return res.json(item);
};
