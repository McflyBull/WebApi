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
    const numTickets = Math.floor(Math.random() * 5) + 1; // 1-5 tickets por función
    const availableSeats = [...seats]; // Copia de asientos para evitar duplicados

    for (let i = 0; i < numTickets; i++) {
      // Seleccionar un cliente aleatorio
      const randomCustomer = customers[Math.floor(Math.random() * customers.length)];

      // Seleccionar un asiento aleatorio disponible
      const randomSeatIndex = Math.floor(Math.random() * availableSeats.length);
      const randomSeat = availableSeats[randomSeatIndex];
      // Remover el asiento usado para evitar duplicados en la misma función
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
