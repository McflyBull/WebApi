import type { User } from "@/api/user/userModel";
import { AppDataSource } from "@/database/data-source";
import { Customer } from "@/entities";
import * as bcrypt from "bcrypt";
import type { Repository } from "typeorm";

export const users: User[] = [
  {
    id: 1,
    name: "Admin",
    email: "admin@example.com",
    password: "Admin",
    age: 42,
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days later
  },
  {
    id: 2,
    name: "Client",
    email: "client@example.com",
    password: "Client",
    age: 21,
    role: "client",
    createdAt: new Date(),
    updatedAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days later
  },
];

export class UserRepository {
  customerRepository: Repository<Customer>;

  constructor() {
    this.customerRepository = AppDataSource.getRepository(Customer);
  }
  async findAllAsync(): Promise<User[]> {
    return users;
  }

  async findByIdAsync(id: number): Promise<User | null> {
    return users.find((user) => user.id === id) || null;
  }

  /**
   * Returns true if the user is registered
   */
  async isEmailRegistered(email: string): Promise<boolean> {
    const customer = await this.customerRepository.findOne({
      where: { email },
    });

    return !!customer;
  }

  async registerAsync(
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    role: string,
  ): Promise<Customer | null> {
    const newUser = this.customerRepository.create({
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: await bcrypt.hash(password, 10),
      role: role,
    });
    return await this.customerRepository.save(newUser);
  }
}
