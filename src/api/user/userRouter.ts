import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { GetUserSchema, UserSchema } from "@/api/user/userModel";
import { requireAuth } from "@/common/middleware/requireAuth";
import { validateRequest } from "@/common/utils/httpHandlers";
import { userController } from "./userController";

export const userRegistry = new OpenAPIRegistry();
export const userRouter: Router = express.Router();

userRegistry.register("User", UserSchema);

const TokenResponseSchema = z.object({
  accessToken: z.string(),
});

userRegistry.registerPath({
  method: "get",
  path: "/users",
  tags: ["User"],
  responses: createApiResponse(TokenResponseSchema, "Success"),
});

userRouter.get("/", requireAuth, userController.getUsers);

userRegistry.registerPath({
  method: "get",
  path: "/users/refresh-token",
  tags: ["User"],
  request: {},
  responses: {
    200: {
      description: "Accesstoken renovado",
      content: {
        "application/json": {
          schema: z.object({
            success: z.boolean(),
            message: z.string(),
            responseObject: z.optional(z.any()),
            statusCode: z.number(),
          }),
          example: {
            success: true,
            message: "Accesstoken renovado",
            responseObject: {
              success: true,
              message: "Accesstoken renovado",
              accessToken:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImZpcnN0X25hbWUiOiJSYXVsIiwibGFzdF9uYW1lIjoiUmF1bCIsImlzX2FkbWluIjpmYWxzZSwiaWF0IjoxNzMzNzgxOTIyLCJleHAiOjE3MzM3ODI4MjJ9.lk3yOAHpnRaD-fS_jn1upiGsjQ8m76rQX2NWgp_Nc78",
            },
            statusCode: 200,
          },
        },
      },
    },
    401: {
      description: "Token de autenticacion no proporcionado",
      content: {
        "application/json": {
          schema: z.object({
            success: z.boolean(),
            message: z.string(),
            responseObject: z.optional(z.any()),
            statusCode: z.number(),
          }),
          example: {
            success: false,
            message: "Token de autenticacion no proporcionado",
            responseObject: null,
            statusCode: 404,
          },
        },
      },
    },
    500: {
      description: "Error interno del servidor",
      content: {
        "application/json": {
          schema: z.object({
            success: z.boolean(),
            message: z.string(),
            responseObject: z.optional(z.any()),
            statusCode: z.number(),
          }),
          example: {
            success: false,
            message: "Error interno del servidor",
            responseObject: null,
            statusCode: 500,
          },
        },
      },
    },
  },
  parameters: [
    {
      in: "header",
      name: "Authorization",
      required: true,
      schema: {
        type: "string",
        example:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImZpcnN0X25hbWUiOiJSYXVsIiwibGFzdF9uYW1lIjoiUmF1bCIsImlzX2FkbWluIjpmYWxzZSwiaWF0IjoxNzMzNzg0MTI3LCJleHAiOjE3MzQzODg5Mjd9.CLkt4ioCVoY9qzITd0yI5IhtDEopIhlcuso_A-PUNyI",
      },
    },
  ],
});

userRouter.get("/refresh-token", userController.refreshToken);

userRegistry.registerPath({
  method: "get",
  path: "/users/{id}",
  tags: ["User"],
  request: { params: GetUserSchema.shape.params },
  responses: createApiResponse(UserSchema, "Success"),
});

userRouter.get("/:id", requireAuth, validateRequest(GetUserSchema), userController.getUser);

// Esquema de validación
const RegisterUserSchema = z.object({
  body: z.object({
    first_name: z.string(),
    last_name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
  }),
});

userRegistry.registerPath({
  method: "post",
  path: "/register",
  tags: ["User"],
  request: {},
  responses: {},
});

userRegistry.registerPath({
  method: "post",
  path: "/users/register",
  tags: ["User"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({
            first_name: z.string(),
            last_name: z.string(),
            email: z.string().email(),
            password: z.string().min(8),
          }),
          example: {
            first_name: "John",
            last_name: "Doe",
            email: "johndoe@example.com",
            password: "securepassword",
          },
        },
      },
    },
  },
  responses: {
    201: {
      description: "Usuario registrado con éxito",
      content: {
        "application/json": {
          schema: z.object({
            success: z.boolean(),
            message: z.string(),
            responseObject: z.optional(z.any()),
            statusCode: z.number(),
          }),
          example: {
            success: true,
            message: "Usuario registrado con éxito",
            responseObject: null,
            statusCode: 201,
          },
        },
      },
    },
    409: {
      description: "El email ya está registrado",
      content: {
        "application/json": {
          schema: z.object({
            success: z.boolean(),
            message: z.string(),
            responseObject: z.optional(z.any()),
            statusCode: z.number(),
          }),
          example: {
            success: false,
            message: "El email ya está registrado",
            responseObject: null,
            statusCode: 409,
          },
        },
      },
    },
    500: {
      description: "Error interno del servidor",
      content: {
        "application/json": {
          schema: z.object({
            success: z.boolean(),
            message: z.string(),
            responseObject: z.optional(z.any()),
            statusCode: z.number(),
          }),
          example: {
            success: false,
            message: "Error interno del servidor",
            responseObject: null,
            statusCode: 500,
          },
        },
      },
    },
  },
});

userRouter.post("/register", validateRequest(RegisterUserSchema), userController.registerUser);

const LoginUserSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8),
  }),
});

userRegistry.registerPath({
  method: "post",
  path: "/users/login",
  tags: ["User"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({
            email: z.string().email(),
            password: z.string().min(8),
          }),
          example: {
            email: "johndoe@example.com",
            password: "securepassword",
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: "User found",
      content: {
        "application/json": {
          schema: z.object({
            success: z.boolean(),
            message: z.string(),
            responseObject: z.optional(z.any()),
            statusCode: z.number(),
          }),
          example: {
            success: true,
            message: "Inicio de sesion exitoso",
            responseObject: {
              success: true,
              message: "Inicio de sesion exitoso",
              first_name: "John",
              last_name: "Doe",
              accessToken:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImZpcnN0X25hbWUiOiJSYXVsIiwibGFzdF9uYW1lIjoiUmF1bCIsImlzX2FkbWluIjpmYWxzZSwiaWF0IjoxNzMzNzgxOTIyLCJleHAiOjE3MzM3ODI4MjJ9.lk3yOAHpnRaD-fS_jn1upiGsjQ8m76rQX2NWgp_Nc78",
              refreshToken:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImZpcnN0X25hbWUiOiJSYXVsIiwibGFzdF9uYW1lIjoiUmF1bCIsImlzX2FkbWluIjpmYWxzZSwiaWF0IjoxNzMzNzgxOTIyLCJleHAiOjE3MzQzODY3MjJ9.aKMFynHDygAVmJ166Mq04vHhKlvNVtyzJnP5tiwwNlM",
              is_admin: true,
            },
            statusCode: 200,
          },
        },
      },
    },
    404: {
      description: "Usuario no encontrado",
      content: {
        "application/json": {
          schema: z.object({
            success: z.boolean(),
            message: z.string(),
            responseObject: z.optional(z.any()),
            statusCode: z.number(),
          }),
          example: {
            success: false,
            message: "Usuario no encontrado",
            responseObject: null,
            statusCode: 404,
          },
        },
      },
    },
    500: {
      description: "Error interno del servidor",
      content: {
        "application/json": {
          schema: z.object({
            success: z.boolean(),
            message: z.string(),
            responseObject: z.optional(z.any()),
            statusCode: z.number(),
          }),
          example: {
            success: false,
            message: "Error interno del servidor",
            responseObject: null,
            statusCode: 500,
          },
        },
      },
    },
  },
});

userRouter.post("/login", validateRequest(LoginUserSchema), userController.loginUser);
