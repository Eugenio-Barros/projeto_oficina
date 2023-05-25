import { User } from "@prisma/client";

//adiciona uma propriedade user opcional à interface Request, permitindo que seja acessada dentro das rotas da aplicação.
declare global {
  namespace Express {
    export interface Request {
      user: User | null;
    }
  }
}
