import { Request, Response } from "express";
import { detail } from "../../services/user";

export default async (req: Request, res: Response) => {
  const { user_id } = req.params;

  const user = await detail(user_id);

  if (!user) {
    return res.status(404).json({
      code: 404,
      message: "User not found",
    });
  }

  return res.json(user);
};
