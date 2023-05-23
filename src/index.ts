import env from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import router from "./routes";
import { verifyToken } from "./middleware/token";

env.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const requestLogger = (request: Request, _: Response, next: NextFunction) => {
  console.log(`[${request.method}] => url:: ${request.url}`);

  next();
};

app.use(requestLogger);

app.use(verifyToken);

app.use(router);

app.listen(port, () =>
  console.log(`Server listening on http://localhost:${port}`)
);
