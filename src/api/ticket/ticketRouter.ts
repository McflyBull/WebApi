import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { validateRequest } from "@/common/utils/httpHandlers";
import { ticketController } from "./ticketController";
import { CreateTicketSchema, GetTicketSchema, GetTicketsByCustomerSchema, TicketSchema } from "./ticketModel";

export const ticketRegistry = new OpenAPIRegistry();
export const router: Router = express.Router();

// OpenAPI Schema Registration
ticketRegistry.register("Ticket", TicketSchema);

// Create (Purchase) Ticket
ticketRegistry.registerPath({
  method: "post",
  path: "/tickets",
  tags: ["Ticket"],
  summary: "Comprar un ticket",
  description: "Compra un ticket para una función específica",
  request: {
    body: {
      content: {
        "application/json": {
          schema: CreateTicketSchema.shape.body,
        },
      },
    },
  },
  responses: {
    ...createApiResponse(TicketSchema, "Ticket comprado exitosamente"),
    400: {
      description: "Datos de entrada inválidos",
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
router.post("/", validateRequest(CreateTicketSchema), ticketController.purchaseTicket.bind(ticketController));

// Get Ticket by ID
ticketRegistry.registerPath({
  method: "get",
  path: "/tickets/{id}",
  tags: ["Ticket"],
  summary: "Obtener ticket por ID",
  description: "Obtiene un ticket específico por su ID",
  request: {
    params: GetTicketSchema.shape.params,
  },
  responses: {
    ...createApiResponse(TicketSchema, "Ticket encontrado exitosamente"),
    404: {
      description: "Ticket no encontrado",
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
router.get("/:id", validateRequest(GetTicketSchema), ticketController.getTicketById.bind(ticketController));

// Get Tickets by User ID
ticketRegistry.registerPath({
  method: "get",
  path: "/tickets/user/{customerId}",
  tags: ["Ticket"],
  summary: "Obtener tickets por cliente",
  description: "Obtiene todos los tickets de un cliente específico",
  request: {
    params: GetTicketsByCustomerSchema.shape.params,
  },
  responses: {
    ...createApiResponse(z.array(TicketSchema), "Tickets encontrados exitosamente"),
    404: {
      description: "No se encontraron tickets",
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
router.get(
  "/user/:customerId",
  validateRequest(GetTicketsByCustomerSchema),
  ticketController.getTicketsByCustomerId.bind(ticketController),
);

export default router;
