import { AppDataSource } from "../data-source";
import { seedCustomers } from "./CustomerSeeder";
import { seedFilmFunctions } from "./FilmFunctionSeeder";
import { seedFilms } from "./FilmSeeder";
import { seedSeats } from "./SeatSeeder";
import { seedTickets } from "./TicketSeeder";

const runSeeders = async () => {
  try {
    await AppDataSource.initialize();

    console.log("Ejecutando seeders...");

    await seedFilms();
    console.log("✓ Películas creadas");

    await seedFilmFunctions();
    console.log("✓ Funciones de películas creadas");

    await seedSeats();
    console.log("✓ Asientos creados");

    await seedCustomers();
    console.log("✓ Clientes creados");

    await seedTickets();
    console.log("✓ Tickets creados");

    console.log("¡Seeders ejecutados exitosamente!");
    process.exit(0);
  } catch (error) {
    console.error("Error al ejecutar los seeders:", error);
    process.exit(1);
  }
};

runSeeders();
