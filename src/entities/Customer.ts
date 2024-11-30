import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Ticket } from '.'

@Entity()
export class Customer {
    @PrimaryGeneratedColumn()
    customer_id: number

    @Column()
    first_name: string

    @Column()
    last_name: string

    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @Column()
    role: string

    @OneToMany(() => Ticket, (ticket: Ticket) => ticket.customer)
    tickets: Ticket[]
} 