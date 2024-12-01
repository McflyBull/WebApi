import { handleServiceResponse, validateRequest } from "@/common/utils/httpHandlers";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import type { CreateTicketDTO } from "./ticketModel";
import { ticketService } from "./ticketService";

export class TicketController {
  async purchaseTicket(req: Request, res: Response): Promise<void> {
    const ticketData = req.body as CreateTicketDTO;
    const serviceResponse = await ticketService.purchaseTicket(ticketData);
    handleServiceResponse(serviceResponse, res);
  }

  async getTicketById(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      handleServiceResponse(
        {
          success: false,
          message: "ID inválido: debe ser un número",
          responseObject: null,
          statusCode: StatusCodes.BAD_REQUEST,
        },
        res,
      );
      return;
    }
    const serviceResponse = await ticketService.getTicketById(id);
    handleServiceResponse(serviceResponse, res);
  }

  async getTicketsByCustomerId(req: Request, res: Response): Promise<void> {
    const customerId = Number(req.params.customerId);
    if (Number.isNaN(customerId)) {
      handleServiceResponse(
        {
          success: false,
          message: "ID de cliente inválido: debe ser un número",
          responseObject: null,
          statusCode: StatusCodes.BAD_REQUEST,
        },
        res,
      );
      return;
    }
    const serviceResponse = await ticketService.getTicketsByCustomerId(customerId);
    handleServiceResponse(serviceResponse, res);
  }
}

export const ticketController = new TicketController();
