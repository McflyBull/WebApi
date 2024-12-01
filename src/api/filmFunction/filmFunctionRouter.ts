import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { validateRequest } from "@/common/utils/httpHandlers";
import { FilmFunctionController } from "./filmFunctionController";
import {
  CreateFilmFunctionSchema,
  FilmFunctionSchema,
  GetFilmFunctionSchema,
  UpdateFilmFunctionSchema,
} from "./filmFunctionModel";
import { FilmFunctionRepository } from "./filmFunctionRepository";
import { FilmFunctionService } from "./filmFunctionService";

export const filmFunctionRegistry = new OpenAPIRegistry();
export const router: Router = express.Router();

// Dependency injection
const repository = new FilmFunctionRepository();
const service = new FilmFunctionService(repository);
const controller = new FilmFunctionController(service);

// OpenAPI Schema Registration
filmFunctionRegistry.register("FilmFunction", FilmFunctionSchema);

// Create
filmFunctionRegistry.registerPath({
  method: "post",
  path: "/film-functions",
  tags: ["FilmFunction"],
  summary: "Create a new film function",
  description: "Creates a new film function with the provided data",
  request: {
    body: {
      content: {
        "application/json": {
          schema: CreateFilmFunctionSchema.shape.body,
        },
      },
    },
  },
  responses: {
    ...createApiResponse(FilmFunctionSchema, "Film function created successfully"),
    400: {
      description: "Invalid input data",
      content: {
        "application/json": {
          schema: z.object({
            success: z.boolean(),
            message: z.string(),
            responseObject: z.null(),
          }),
        },
      },
    },
  },
});
router.post("/", validateRequest(CreateFilmFunctionSchema), controller.create.bind(controller));

// Get All
filmFunctionRegistry.registerPath({
  method: "get",
  path: "/film-functions",
  tags: ["FilmFunction"],
  summary: "Get all film functions",
  description: "Retrieves a list of all active film functions",
  responses: {
    ...createApiResponse(z.array(FilmFunctionSchema), "Film functions retrieved successfully"),
    404: {
      description: "No film functions found",
      content: {
        "application/json": {
          schema: z.object({
            success: z.boolean(),
            message: z.string(),
            responseObject: z.null(),
          }),
        },
      },
    },
  },
});
router.get("/", controller.getAll.bind(controller));

// Get By Id
filmFunctionRegistry.registerPath({
  method: "get",
  path: "/film-functions/{id}",
  tags: ["FilmFunction"],
  summary: "Get film function by ID",
  description: "Retrieves a specific film function by its ID",
  request: {
    params: GetFilmFunctionSchema.shape.params,
  },
  responses: {
    ...createApiResponse(FilmFunctionSchema, "Film function retrieved successfully"),
    400: {
      description: "Invalid ID format",
      content: {
        "application/json": {
          schema: z.object({
            success: z.boolean(),
            message: z.string(),
            responseObject: z.null(),
          }),
        },
      },
    },
    404: {
      description: "Film function not found",
      content: {
        "application/json": {
          schema: z.object({
            success: z.boolean(),
            message: z.string(),
            responseObject: z.null(),
          }),
        },
      },
    },
  },
});
router.get("/:id", validateRequest(GetFilmFunctionSchema), controller.getById.bind(controller));

// Update
filmFunctionRegistry.registerPath({
  method: "put",
  path: "/film-functions/{id}",
  tags: ["FilmFunction"],
  summary: "Update film function",
  description: "Updates an existing film function with the provided data",
  request: {
    params: UpdateFilmFunctionSchema.shape.params,
    body: {
      content: {
        "application/json": {
          schema: UpdateFilmFunctionSchema.shape.body,
        },
      },
    },
  },
  responses: {
    ...createApiResponse(FilmFunctionSchema, "Film function updated successfully"),
    400: {
      description: "Invalid input data or ID format",
      content: {
        "application/json": {
          schema: z.object({
            success: z.boolean(),
            message: z.string(),
            responseObject: z.null(),
          }),
        },
      },
    },
    404: {
      description: "Film function not found",
      content: {
        "application/json": {
          schema: z.object({
            success: z.boolean(),
            message: z.string(),
            responseObject: z.null(),
          }),
        },
      },
    },
  },
});
router.put("/:id", validateRequest(UpdateFilmFunctionSchema), controller.update.bind(controller));

// Delete
filmFunctionRegistry.registerPath({
  method: "delete",
  path: "/film-functions/{id}",
  tags: ["FilmFunction"],
  summary: "Delete film function",
  description: "Deletes a specific film function by its ID",
  request: {
    params: GetFilmFunctionSchema.shape.params,
  },
  responses: {
    ...createApiResponse(z.boolean(), "Film function deleted successfully"),
    400: {
      description: "Invalid ID format",
      content: {
        "application/json": {
          schema: z.object({
            success: z.boolean(),
            message: z.string(),
            responseObject: z.null(),
          }),
        },
      },
    },
    404: {
      description: "Film function not found",
      content: {
        "application/json": {
          schema: z.object({
            success: z.boolean(),
            message: z.string(),
            responseObject: z.null(),
          }),
        },
      },
    },
  },
});
router.delete("/:id", validateRequest(GetFilmFunctionSchema), controller.delete.bind(controller));

export default router;
