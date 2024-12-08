import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { GetUserSchema, UserSchema } from "@/api/user/userModel";
import { validateRequest } from "@/common/utils/httpHandlers";
import { userController } from "./userController";

export const userRegistry = new OpenAPIRegistry();
export const userRouter: Router = express.Router();

userRegistry.register("User", UserSchema);

userRegistry.registerPath({
  method: "get",
  path: "/users",
  tags: ["User"],
  responses: createApiResponse(z.array(UserSchema), "Success"),
});

userRouter.get("/", userController.getUsers);

userRegistry.registerPath({
  method: "get",
  path: "/users/{id}",
  tags: ["User"],
  request: { params: GetUserSchema.shape.params },
  responses: createApiResponse(UserSchema, "Success"),
});

userRouter.get("/:id", validateRequest(GetUserSchema), userController.getUser);

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
  path: "/register",
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
