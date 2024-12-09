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

  // Contador total de tickets
  let totalTickets = 0;

  // Registro de películas por usuario
  const userMovies: Record<number, Set<number>> = {
    1: new Set(),
    2: new Set(),
    3: new Set(),
  };

  // Para cada función, crear tickets
  for (const filmFunction of functions) {
    if (totalTickets >= 20) break;

    const functionWithDetails = await functionRepository.findOne({
      where: { function_id: filmFunction.function_id },
      relations: ["seats", "film"],
    });

    if (!functionWithDetails || !functionWithDetails.seats || !functionWithDetails.film) continue;

    const availableSeats = [...functionWithDetails.seats];

    while (availableSeats.length > 0 && totalTickets < 20) {
      const randomSeatIndex = Math.floor(Math.random() * availableSeats.length);
      const randomSeat = availableSeats[randomSeatIndex];
      availableSeats.splice(randomSeatIndex, 1);

      // Encontrar un usuario que no haya visto esta película
      let selectedCustomerId = null;
      for (let userId = 1; userId <= 3; userId++) {
        if (!userMovies[userId].has(functionWithDetails.film.film_id)) {
          selectedCustomerId = userId;
          userMovies[userId].add(functionWithDetails.film.film_id);
          break;
        }
      }

      if (selectedCustomerId === null) continue;

      const ticketData = {
        function_id: filmFunction.function_id,
        customer_id: selectedCustomerId,
        seat_id: randomSeat.seat_id,
        purchase_date: new Date(),
        total_price: filmFunction.ticket_price,
      };

      await ticketRepository.save(ticketRepository.create(ticketData));
      totalTickets++;
    }
  }
};
