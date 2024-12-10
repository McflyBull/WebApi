import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { requireAuth } from "@/common/middleware/requireAuth";
import { validateRequest } from "@/common/utils/httpHandlers";
import { FilmController } from "./filmController";
import { CreateFilmSchema, FilmSchema, GetFilmSchema, UpdateFilmSchema } from "./filmModel";
import { FilmRepository } from "./filmRepository";
import { FilmService } from "./filmService";

export const filmRegistry = new OpenAPIRegistry();
export const router: Router = express.Router();

// Dependency injection
const repository = new FilmRepository();
const service = new FilmService(repository);
const controller = new FilmController(service);

// OpenAPI Schema Registration
filmRegistry.register("Film", FilmSchema);

// Create
filmRegistry.registerPath({
  method: "post",
  path: "/films",
  tags: ["Film"],
  summary: "Create a new film",
  description: "Creates a new film with the provided data",
  request: {
    body: {
      content: {
        "application/json": {
          schema: CreateFilmSchema.shape.body,
        },
      },
    },
  },
  responses: {
    ...createApiResponse(FilmSchema, "Film created successfully"),
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
router.post("/", requireAuth, validateRequest(CreateFilmSchema), controller.create.bind(controller));

// Get All
filmRegistry.registerPath({
  method: "get",
  path: "/films",
  tags: ["Film"],
  summary: "Get all films",
  description: "Retrieves a list of all films",
  responses: {
    ...createApiResponse(z.array(FilmSchema), "Films retrieved successfully"),
    404: {
      description: "No films found",
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

// Get All
filmRegistry.registerPath({
  method: "get",
  path: "/films/now_playing",
  tags: ["Film"],
  summary: "Get all now playing films",
  description: "Retrieves a list of all now playing films",
  responses: {
    ...createApiResponse(z.array(FilmSchema), "Films retrieved successfully"),
    404: {
      description: "No films found",
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
router.get("/now_playing", controller.getNowPlaying.bind(controller));

// Get All
filmRegistry.registerPath({
  method: "get",
  path: "/films/upcoming",
  tags: ["Film"],
  summary: "Get all upcoming films",
  description: "Retrieves a list of all upcoming films",
  responses: {
    ...createApiResponse(z.array(FilmSchema), "Films retrieved successfully"),
    404: {
      description: "No films found",
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
router.get("/upcoming", controller.getUpcoming.bind(controller));

// Get By Id
filmRegistry.registerPath({
  method: "get",
  path: "/films/{id}",
  tags: ["Film"],
  summary: "Get film by ID",
  description: "Retrieves a specific film by its ID, including functions and their seats with occupation status",
  request: {
    params: GetFilmSchema.shape.params,
  },
  responses: {
    ...createApiResponse(FilmSchema, "Film retrieved successfully"),
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
      description: "Film not found",
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
router.get("/:id", validateRequest(GetFilmSchema), controller.getById.bind(controller));

// Update
filmRegistry.registerPath({
  method: "put",
  path: "/films/{id}",
  tags: ["Film"],
  summary: "Update film",
  description: "Updates an existing film with the provided data",
  request: {
    params: UpdateFilmSchema.shape.params,
    body: {
      content: {
        "application/json": {
          schema: UpdateFilmSchema.shape.body,
        },
      },
    },
  },
  responses: {
    ...createApiResponse(FilmSchema, "Film updated successfully"),
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
      description: "Film not found",
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
router.put("/:id", requireAuth, validateRequest(UpdateFilmSchema), controller.update.bind(controller));

// Delete
filmRegistry.registerPath({
  method: "delete",
  path: "/films/{id}",
  tags: ["Film"],
  summary: "Delete film",
  description: "Deletes a specific film by its ID",
  request: {
    params: GetFilmSchema.shape.params,
  },
  responses: {
    ...createApiResponse(z.boolean(), "Film deleted successfully"),
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
      description: "Film not found",
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
router.delete("/:id", requireAuth, validateRequest(GetFilmSchema), controller.delete.bind(controller));

export default router;
