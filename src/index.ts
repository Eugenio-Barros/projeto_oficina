import env from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import router from "./routes";
import { verifyToken } from "./middleware/token";

env.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

//A função ´requestLogger´ é um middleware que imprime no console o método HTTP e a URL de uma solicitação recebida, e em seguida passa o controle para o próximo middleware ou rota.
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
