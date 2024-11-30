import { AppDataSource } from '../data-source';
import { seedFilms } from './FilmSeeder';
import { seedFilmFunctions } from './FilmFunctionSeeder';
import { seedSeats } from './SeatSeeder';
import { seedCustomers } from './CustomerSeeder';

const runSeeders = async () => {
  try {
    await AppDataSource.initialize();
    
    console.log('Ejecutando seeders...');

    await seedFilms();
    console.log('✓ Películas creadas');

    await seedFilmFunctions();
    console.log('✓ Funciones de películas creadas');

    await seedSeats();
    console.log('✓ Asientos creados');

    await seedCustomers();
    console.log('✓ Clientes creados');

    console.log('¡Seeders ejecutados exitosamente!');
    process.exit(0);
  } catch (error) {
    console.error('Error al ejecutar los seeders:', error);
    process.exit(1);
  }
};

runSeeders(); 