import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Customer, FilmFunction, Seat, Ticket } from ".";

@Entity()
export class Film {
  @PrimaryGeneratedColumn()
  id: number;

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

  @OneToMany(
    () => FilmFunction,
    (filmFunction: FilmFunction) => filmFunction.film,
  )
  functions: FilmFunction[];
}
