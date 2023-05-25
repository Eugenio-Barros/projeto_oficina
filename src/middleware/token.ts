import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { ExtendedPayload } from "../models/token";
import { findById } from "../services/auth";

const publicAcesspoints = ["/auth/login", "/auth/register"];

export function verifyToken(
  request: Request,
  response: Response,
  next: NextFunction
) {
  //o código verifica se o caminho da solicitação está na lista de pontos de acesso públicos. Se estiver, a função avança para a próxima etapa. Isso permite que certos caminhos sejam acessados publicamente sem restrições.
  if (publicAcesspoints.includes(request.path)) {
    return next();
  }

  const authHeader = request.headers.authorization;

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return response.sendStatus(401).json({
      code: 401,
      message: "Token not found",
    });
  }

  //serve para verificar um token de autenticação, se o token for válido, o código extrai o ID do usuário do payload do token, busca as informações do usuário com base nesse ID e, em seguida, prossegue para a próxima etapa no fluxo de execução.
  verify(token, "Secret", async (error, payload) => {
    if (error) {
      return response.status(403).json({
        code: 403,
        message: error.message,
      });
    }

    const { user_id: id } = payload as ExtendedPayload;

    request.user = await findById(id);

    next();
  });
}
