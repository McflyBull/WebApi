import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { FilmFunction } from ".";

@Entity()
export class Film {
  @PrimaryGeneratedColumn()
  film_id: number;

  @Column({ type: "varchar" })
  title: string;

  @Column({ type: "text" })
  overview: string;

  @Column({ type: "varchar" })
  poster_path: string;

  @Column({ type: "varchar" })
  release_date: string;

  @Column({ type: "float" })
  vote_average: number;

  @Column({ type: "int" })
  vote_count: number;

  @Column({ type: "boolean", default: false })
  is_upcoming: boolean;

  @OneToMany(
    () => FilmFunction,
    (filmFunction: FilmFunction) => filmFunction.film,
  )
  functions: FilmFunction[];
}
