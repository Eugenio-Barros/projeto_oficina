import { Request, Response } from "express";
import { create } from "../../services/cars";
import { Car } from "../../models/car";

export default async (req: Request, res: Response) => {
  const { ...car }: Car = req.body;

  const newCar = await create(car);

  return res.json(newCar);
};
