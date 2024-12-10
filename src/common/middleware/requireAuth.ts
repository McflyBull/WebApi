import { ServiceResponse } from "@/common/models/serviceResponse";
import { handleServiceResponse } from "@/common/utils/httpHandlers";
import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface DecodedToken {
  id: string;
  first_name: string;
  last_name: string;
  role: string;
  exp: number;
  iat: number;
}

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    const message = "Token de autenticación no proporcionado";
    const serviceResponse = ServiceResponse.unauthorized(message, null);
    return handleServiceResponse(serviceResponse, res);
  }

  // El valor del encabezado de autorización debe tener el formato "Bearer tu_token_jwt_aqui"
  const [bearer, token] = authHeader.split(" ");
  if (bearer !== "Bearer" || !token) {
    const message = "Formato de token no válido";
    const serviceResponse = ServiceResponse.unauthorized(message, null);
    return handleServiceResponse(serviceResponse, res);
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET!) as DecodedToken;
    // @ts-ignore
    req.user = decodedToken; // Agregar información del usuario a la solicitud
    next();
  } catch (error) {
    const message = "Token de autenticación inválido";
    const serviceResponse = ServiceResponse.unauthorized(message, null);
    return handleServiceResponse(serviceResponse, res);
  }
};
