import { AppDataSource } from "@/database/data-source";
import { Ticket } from "@/entities";
import type { Repository } from "typeorm";
import type { CreateTicketDTO } from "./ticketModel";

export class TicketRepository {
  private repository: Repository<Ticket>;

  constructor() {
    this.repository = AppDataSource.getRepository(Ticket);
  }

  async create(ticketData: CreateTicketDTO): Promise<Ticket> {
    const ticket = this.repository.create({
      ...ticketData,
      purchase_date: new Date(),
      total_price: 0, // Se actualiza despues en el servicio. Este es un valor dummy
    });
    return await this.repository.save(ticket);
  }

  async findById(id: number): Promise<Ticket | null> {
    return await this.repository.findOne({
      where: { ticket_id: id },
      relations: ["function", "customer", "seat"],
    });
  }

  async findByCustomerId(customerId: number): Promise<Ticket[]> {
    return await this.repository.find({
      where: { customer_id: customerId },
      relations: ["function", "function.film", "customer", "seat"],
      order: {
        purchase_date: "DESC",
      },
    });
  }
}

export const ticketRepository = new TicketRepository();
