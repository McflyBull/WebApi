import { Seat } from '../../entities/Seat';
import { AppDataSource } from '../data-source';

export const seedSeats = async () => {
  const seatRepository = AppDataSource.getRepository(Seat);

  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const columns = 12;

  for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    for (let col = 1; col <= columns; col++) {
      const seatData = {
        seat_number: `${rows[rowIndex]}${col}`,
        row_identifier: rows[rowIndex],
        row: rowIndex + 1,
        column: col
      };

      const existingSeat = await seatRepository.findOne({
        where: { seat_number: seatData.seat_number }
      });

      if (!existingSeat) {
        await seatRepository.save(seatRepository.create(seatData));
      }
    }
  }
}; 