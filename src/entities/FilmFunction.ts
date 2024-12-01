import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Film, Seat, Ticket } from ".";

@Entity()
export class FilmFunction {
  @PrimaryGeneratedColumn()
  function_id: number;

  @Column({ type: "int" })
  film_id: number;

  @Column("date")
  function_date: Date;

  @Column("time")
  start_time: string;

  @Column("time")
  end_time: string;

  @Column("decimal", { precision: 10, scale: 2 })
  ticket_price: number;

  @ManyToOne(
    () => Film,
    (film: Film) => film.functions,
  )
  @JoinColumn({ name: "film_id" })
  film: Film;

  @OneToMany(
    () => Ticket,
    (ticket: Ticket) => ticket.function,
  )
  tickets: Ticket[];

  @OneToMany(
    () => Seat,
    (seat: Seat) => seat.function,
  )
  seats: Seat[];
}
