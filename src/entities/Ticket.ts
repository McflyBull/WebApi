import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { FilmFunction } from "./FilmFunction"
import { Customer } from "./Customer"
import { Seat } from "./Seat"

@Entity()
export class Ticket {
    @PrimaryGeneratedColumn()
    ticket_id: number

    @Column()
    function_id: number

    @Column()
    customer_id: number

    @Column()
    seat_id: number

    @Column("timestamp")
    purchase_date: Date

    @Column("decimal", { precision: 10, scale: 2 })
    total_price: number

    @ManyToOne(() => FilmFunction, filmFunction => filmFunction.tickets)
    @JoinColumn({ name: "function_id" })
    function: FilmFunction

    @ManyToOne(() => Customer, customer => customer.tickets)
    @JoinColumn({ name: "customer_id" })
    customer: Customer

    @ManyToOne(() => Seat, seat => seat.tickets)
    @JoinColumn({ name: "seat_id" })
    seat: Seat
} 