import { Film } from '../../entities/Film';
import { AppDataSource } from '../data-source';

export const seedFilms = async () => {
  const filmRepository = AppDataSource.getRepository(Film);

  const films = [
    {
      title: "Inception",
      overview: "Un ladrón con la rara habilidad de 'extracción' roba secretos del subconsciente durante el estado del sueño cuando la mente está más vulnerable.",
      poster_path: "/inception.jpg",
      release_date: "2010-07-16",
      vote_average: 8,
      vote_count: 29000
    },
    {
      title: "The Dark Knight",
      overview: "Batman aumenta las apuestas en su guerra contra el crimen. Con la ayuda del teniente Jim Gordon y el Fiscal del Distrito Harvey Dent, Batman se propone desmantelar las organizaciones criminales que plagan las calles.",
      poster_path: "/dark-knight.jpg",
      release_date: "2008-07-18",
      vote_average: 9,
      vote_count: 25000
    },
    {
      title: "Pulp Fiction",
      overview: "La vida de un boxeador, dos sicarios, la esposa de un gángster y dos bandidos se entrelaza en una historia de violencia y redención.",
      poster_path: "/pulp-fiction.jpg",
      release_date: "1994-10-14",
      vote_average: 8,
      vote_count: 20000
    }
  ];

  for (const filmData of films) {
    const existingFilm = await filmRepository.findOne({
      where: { title: filmData.title }
    });

    if (!existingFilm) {
      await filmRepository.save(filmRepository.create(filmData));
    }
  }
}; 