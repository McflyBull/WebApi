import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "./Customer";
import { FilmFunction } from "./FilmFunction";
import { Seat } from "./Seat";

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  ticket_id: number;

  @Column({ type: "int" })
  function_id: number;

  @Column({ type: "int" })
  customer_id: number;

  @Column({ type: "int" })
  seat_id: number;

  @Column("timestamp")
  purchase_date: Date;

  @Column("decimal", { precision: 10, scale: 2 })
  total_price: number;

  @ManyToOne(
    () => FilmFunction,
    (filmFunction) => filmFunction.tickets,
  )
  @JoinColumn({ name: "function_id" })
  function: FilmFunction;

  @ManyToOne(
    () => Customer,
    (customer) => customer.tickets,
  )
  @JoinColumn({ name: "customer_id" })
  customer: Customer;

  @ManyToOne(
    () => Seat,
    (seat) => seat.tickets,
  )
  @JoinColumn({ name: "seat_id" })
  seat: Seat;
}
