import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { FilmFunction, Ticket } from ".";

@Entity()
export class Seat {
  @PrimaryGeneratedColumn()
  seat_id: number;

  @Column({ type: "varchar" })
  seat_number: string;

  @Column({ type: "varchar" })
  row_identifier: string;

  @Column({ type: "int" })
  row: number;

  @Column({ type: "int" })
  column: number;

  @ManyToOne(
    () => FilmFunction,
    (filmFunction) => filmFunction.seats,
  )
  function: FilmFunction;

  @OneToMany(
    () => Ticket,
    (ticket: Ticket) => ticket.seat,
  )
  tickets: Ticket[];
}
