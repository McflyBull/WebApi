import { FilmFunction } from '../../entities/FilmFunction';
import { Film } from '../../entities/Film';
import { AppDataSource } from '../data-source';

export const seedFilmFunctions = async () => {
  const filmFunctionRepository = AppDataSource.getRepository(FilmFunction);
  const filmRepository = AppDataSource.getRepository(Film);

  const films = await filmRepository.find();

  for (const film of films) {
    const functions = [
      {
        film_id: film.id,
        function_date: new Date('2024-01-20'),
        start_time: '14:00:00',
        end_time: '16:30:00',
        ticket_price: 12.50
      },
      {
        film_id: film.id,
        function_date: new Date('2024-01-20'),
        start_time: '17:00:00',
        end_time: '19:30:00',
        ticket_price: 15.00
      },
      {
        film_id: film.id,
        function_date: new Date('2024-01-20'),
        start_time: '20:00:00',
        end_time: '22:30:00',
        ticket_price: 15.00
      }
    ];

    for (const functionData of functions) {
      const existingFunction = await filmFunctionRepository.findOne({
        where: {
          film_id: functionData.film_id,
          function_date: functionData.function_date,
          start_time: functionData.start_time
        }
      });

      if (!existingFunction) {
        await filmFunctionRepository.save(filmFunctionRepository.create(functionData));
      }
    }
  }
}; 