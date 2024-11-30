import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"
import { FilmFunction, Ticket } from '.'

@Entity()
export class Seat {
    @PrimaryGeneratedColumn()
    seat_id: number

    @Column()
    seat_number: string

    @Column()
    row_identifier: string

    @Column()
    row: number

    @Column()
    column: number

    @ManyToOne(() => FilmFunction, filmFunction => filmFunction.seats)
    function: FilmFunction

    @OneToMany(() => Ticket, (ticket: Ticket) => ticket.seat)
    tickets: Ticket[]
} 