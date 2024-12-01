import { validateRequest } from "@/common/utils/httpHandlers";
import { Router } from "express";
import { ticketController } from "./ticketController";
import { CreateTicketSchema } from "./ticketModel";

const router = Router();

// POST /api/tickets - Comprar un ticket
router.post("/", validateRequest(CreateTicketSchema), ticketController.purchaseTicket.bind(ticketController));

// GET /api/tickets/:id - Obtener un ticket por ID
router.get("/:id", ticketController.getTicketById.bind(ticketController));

// GET /api/tickets/customer/:customerId - Obtener tickets por ID de cliente
router.get("/customer/:customerId", ticketController.getTicketsByCustomerId.bind(ticketController));

export { router as ticketRoutes };
