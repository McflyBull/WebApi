import { ServiceResponse } from "@/common/models/serviceResponse";
import { AppDataSource } from "@/database/data-source";
import { Ticket } from "@/entities";
import { Customer, FilmFunction, Seat } from "@/entities";
import { logger } from "@/server";
import { StatusCodes } from "http-status-codes";
import type { CreateTicketDTO } from "./ticketModel";
import { ticketRepository } from "./ticketRepository";

export class TicketService {
  async purchaseTicket(ticketData: CreateTicketDTO): Promise<ServiceResponse<Ticket | null>> {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Verificar que el cliente existe
      const customer = await queryRunner.manager.findOne(Customer, {
        where: { customer_id: ticketData.customer_id },
      });

      if (!customer) {
        return ServiceResponse.failure("El cliente no existe", null, StatusCodes.NOT_FOUND);
      }

      // Verificar que la función existe y obtener su precio
      const filmFunction = await queryRunner.manager.findOne(FilmFunction, {
        where: { function_id: ticketData.function_id },
      });

      if (!filmFunction) {
        return ServiceResponse.failure("La función no existe", null, StatusCodes.NOT_FOUND);
      }

      // Verificar que el asiento existe y está disponible para esa función
      const seat = await queryRunner.manager.findOne(Seat, {
        where: { seat_id: ticketData.seat_id },
        relations: ["tickets"],
      });

      if (!seat) {
        return ServiceResponse.failure("El asiento no existe", null, StatusCodes.NOT_FOUND);
      }

      // Verificar si el asiento ya está ocupado para esta función
      const isOccupied = seat.tickets?.some((ticket) => ticket.function_id === ticketData.function_id);
      if (isOccupied) {
        return ServiceResponse.failure("El asiento ya está ocupado para esta función", null, StatusCodes.CONFLICT);
      }

      // Crear el ticket con el precio de la función
      const ticket = await queryRunner.manager.create(Ticket, {
        ...ticketData,
        purchase_date: new Date(),
        total_price: filmFunction.ticket_price,
      });

      await queryRunner.manager.save(ticket);
      await queryRunner.commitTransaction();

      return ServiceResponse.success<Ticket>("Ticket comprado exitosamente", ticket, StatusCodes.CREATED);
    } catch (ex) {
      await queryRunner.rollbackTransaction();
      const errorMessage = `Error al comprar el ticket: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "Ocurrió un error al procesar la compra del ticket",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    } finally {
      await queryRunner.release();
    }
  }

  async getTicketById(id: number): Promise<ServiceResponse<Ticket | null>> {
    try {
      const ticket = await ticketRepository.findById(id);
      if (!ticket) {
        return ServiceResponse.failure("Ticket no encontrado", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<Ticket>("Ticket encontrado exitosamente", ticket);
    } catch (ex) {
      const errorMessage = `Error al buscar el ticket: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure("Ocurrió un error al buscar el ticket", null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  async getTicketsByCustomerId(customerId: number): Promise<ServiceResponse<Ticket[] | null>> {
    try {
      const tickets = await ticketRepository.findByCustomerId(customerId);
      if (!tickets || tickets.length === 0) {
        return ServiceResponse.failure("No se encontraron tickets para este cliente", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<Ticket[]>("Tickets encontrados exitosamente", tickets);
    } catch (ex) {
      const errorMessage = `Error al buscar los tickets del cliente: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "Ocurrió un error al buscar los tickets del cliente",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

export const ticketService = new TicketService();
