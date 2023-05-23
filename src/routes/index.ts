import express, { Request, Response } from "express";
import { name, version } from "../../package.json";
import carsRoutes from "./cars";
import usersRoutes from "./users";
import ordersRoutes from "./orders";
import itemsRoutes from "./items";
import authRoutes from "./auth";

const router = express.Router();

router.get("/", (_: Request, res: Response) => {
  res.json({
    name,
    version,
  });
});

router.use("/auth", authRoutes);
router.use("/cars", carsRoutes);
router.use("/users", usersRoutes);
router.use("/orders", ordersRoutes);
router.use("/items", itemsRoutes);

export default router;
