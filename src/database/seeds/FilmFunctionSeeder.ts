import { Film } from "../../entities/Film";
import { FilmFunction } from "../../entities/FilmFunction";
import { AppDataSource } from "../data-source";

export const seedFilmFunctions = async () => {
  const filmFunctionRepository = AppDataSource.getRepository(FilmFunction);
  const filmRepository = AppDataSource.getRepository(Film);

  // Limpiar usando SQL directo
  await filmRepository.query("SET FOREIGN_KEY_CHECKS = 0");
  await filmRepository.query("TRUNCATE TABLE film_function");
  await filmRepository.query("SET FOREIGN_KEY_CHECKS = 1");

  const films = await filmRepository.find();

  for (const film of films) {
    const functions = [
      {
        film_id: film.film_id,
        function_date: new Date("2024-01-20"),
        start_time: "14:00:00",
        end_time: "16:30:00",
        ticket_price: 10000,
      },
      {
        film_id: film.film_id,
        function_date: new Date("2024-01-20"),
        start_time: "17:00:00",
        end_time: "19:30:00",
        ticket_price: 8000,
      },
      {
        film_id: film.film_id,
        function_date: new Date("2024-01-20"),
        start_time: "20:00:00",
        end_time: "22:30:00",
        ticket_price: 8000,
      },
    ];

    for (const functionData of functions) {
      const existingFunction = await filmFunctionRepository.findOne({
        where: {
          film_id: functionData.film_id,
          function_date: functionData.function_date,
          start_time: functionData.start_time,
        },
      });

      if (!existingFunction) {
        await filmFunctionRepository.save(filmFunctionRepository.create(functionData));
      }
    }
  }
};
