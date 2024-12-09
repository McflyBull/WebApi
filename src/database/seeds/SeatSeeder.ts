import { FilmFunction } from "../../entities/FilmFunction";
import { Seat } from "../../entities/Seat";
import { AppDataSource } from "../data-source";

export const seedSeats = async () => {
  const seatRepository = AppDataSource.getRepository(Seat);
  const filmFunctionRepository = AppDataSource.getRepository(FilmFunction);

  // Limpiar usando SQL directo
  await seatRepository.query("SET FOREIGN_KEY_CHECKS = 0");
  await seatRepository.query("TRUNCATE TABLE seat");
  await seatRepository.query("SET FOREIGN_KEY_CHECKS = 1");

  // Obtener todas las funciones
  const filmFunctions = await filmFunctionRepository.find();

  const rows = ["A", "B", "C", "D", "E"];
  const columns = 8;

  // Crear asientos para cada función
  for (const filmFunction of filmFunctions) {
    for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
      for (let col = 1; col <= columns; col++) {
        const seatData = {
          seat_number: `${rows[rowIndex]}${col}`,
          row_identifier: rows[rowIndex],
          row: rowIndex + 1,
          column: col,
          function: filmFunction,
        };

        const existingSeat = await seatRepository.findOne({
          where: {
            seat_number: seatData.seat_number,
            function: { function_id: filmFunction.function_id },
          },
        });

        if (!existingSeat) {
          await seatRepository.save(seatRepository.create(seatData));
        }
      }
    }
  }
};
