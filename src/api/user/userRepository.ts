import type { User } from "@/api/user/userModel";

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
  async findAllAsync(): Promise<User[]> {
    return users;
  }

  async findByIdAsync(id: number): Promise<User | null> {
    return users.find((user) => user.id === id) || null;
  }
}
