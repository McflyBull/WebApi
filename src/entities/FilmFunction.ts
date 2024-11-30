import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm"
import { Film, Ticket, Seat } from '.'

@Entity()
export class FilmFunction {
    @PrimaryGeneratedColumn()
    function_id: number

    @Column()
    film_id: number

    @Column("date")
    function_date: Date

    @Column("time")
    start_time: string

    @Column("time")
    end_time: string

    @Column("decimal", { precision: 10, scale: 2 })
    ticket_price: number

    @ManyToOne(() => Film, (film: Film) => film.functions)
    @JoinColumn({ name: "film_id" })
    film: Film

    @OneToMany(() => Ticket, (ticket: Ticket) => ticket.function)
    tickets: Ticket[]

    @OneToMany(() => Seat, (seat: Seat) => seat.function)
    seats: Seat[]
} 