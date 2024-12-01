import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Ticket } from ".";

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  customer_id: number;

  @Column({ type: "varchar" })
  first_name: string;

  @Column({ type: "varchar" })
  last_name: string;

  @Column({ type: "varchar", unique: true })
  email: string;

  @Column({ type: "varchar" })
  password: string;

  @Column({ type: "varchar" })
  role: string;

  @OneToMany(
    () => Ticket,
    (ticket: Ticket) => ticket.customer,
  )
  tickets: Ticket[];
}
