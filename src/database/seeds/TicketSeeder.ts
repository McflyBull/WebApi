import { Customer } from "../../entities/Customer";
import { FilmFunction } from "../../entities/FilmFunction";
import { Seat } from "../../entities/Seat";
import { Ticket } from "../../entities/Ticket";
import { AppDataSource } from "../data-source";

export const seedTickets = async () => {
  const ticketRepository = AppDataSource.getRepository(Ticket);
  const functionRepository = AppDataSource.getRepository(FilmFunction);
  const customerRepository = AppDataSource.getRepository(Customer);
  const seatRepository = AppDataSource.getRepository(Seat);

  // Limpiar usando SQL directo
  await ticketRepository.query("SET FOREIGN_KEY_CHECKS = 0");
  await ticketRepository.query("TRUNCATE TABLE ticket");
  await ticketRepository.query("SET FOREIGN_KEY_CHECKS = 1");

  // Obtener todas las funciones, clientes y asientos
  const functions = await functionRepository.find();
  const customers = await customerRepository.find();
  const seats = await seatRepository.find();

  // Para cada función, crear entre 1 y 5 tickets aleatorios
  for (const filmFunction of functions) {
    // Cargar la función con sus asientos relacionados
    const functionWithSeats = await functionRepository.findOne({
      where: { function_id: filmFunction.function_id },
      relations: ["seats"],
    });

    if (!functionWithSeats || !functionWithSeats.seats) continue;

    const numTickets = Math.floor(Math.random() * 5) + 1;
    const availableSeats = [...functionWithSeats.seats];

    // Limitar el número de tickets al número de asientos disponibles
    const actualNumTickets = Math.min(numTickets, availableSeats.length);

    for (let i = 0; i < actualNumTickets; i++) {
      const randomCustomer = customers[Math.floor(Math.random() * customers.length)];

      // Seleccionar un asiento aleatorio disponible
      const randomSeatIndex = Math.floor(Math.random() * availableSeats.length);
      const randomSeat = availableSeats[randomSeatIndex];
      availableSeats.splice(randomSeatIndex, 1);

      const ticketData = {
        function_id: filmFunction.function_id,
        customer_id: randomCustomer.customer_id,
        seat_id: randomSeat.seat_id,
        purchase_date: new Date(),
        total_price: filmFunction.ticket_price,
      };

      await ticketRepository.save(ticketRepository.create(ticketData));
    }
  }
};
