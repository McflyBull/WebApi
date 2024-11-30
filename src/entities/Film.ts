import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { FilmFunction, Customer, Ticket, Seat } from '.'

@Entity()
export class Film {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column("text")
    overview: string

    @Column()
    poster_path: string

    @Column()
    release_date: string

    @Column()
    vote_average: number

    @Column()
    vote_count: number

    @OneToMany(() => FilmFunction, (filmFunction: FilmFunction) => filmFunction.film)
    functions: FilmFunction[]
} 