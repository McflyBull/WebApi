import { StatusCodes } from "http-status-codes";

import type { Customer } from "@/api/user/customerModel";
import type { User } from "@/api/user/userModel";
import { UserRepository } from "@/api/user/userRepository";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { logger } from "@/server";
import jwt, { type JwtPayload } from "jsonwebtoken";

interface UserPayload extends JwtPayload {
  customer_id: number;
  first_name: string;
  last_name: string;
  role: string;
}

export class UserService {
  private userRepository: UserRepository;

  constructor(repository: UserRepository = new UserRepository()) {
    this.userRepository = repository;
  }

  // Retrieves all users from the database
  async findAll(): Promise<ServiceResponse<User[] | null>> {
    try {
      const users = await this.userRepository.findAllAsync();
      if (!users || users.length === 0) {
        return ServiceResponse.failure("No Users found", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<User[]>("Users found", users);
    } catch (ex) {
      const errorMessage = `Error finding all users: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while retrieving users.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Retrieves a single user by their ID
  async findById(id: number): Promise<ServiceResponse<User | null>> {
    try {
      const user = await this.userRepository.findByIdAsync(id);
      if (!user) {
        return ServiceResponse.failure("User not found", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<User>("User found", user);
    } catch (ex) {
      const errorMessage = `Error finding user with id ${id}:, ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure("An error occurred while finding user.", null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  async register(
    first_name: string,
    last_name: string,
    email: string,
    password: string,
  ): Promise<ServiceResponse<null>> {
    try {
      const isEmailRegistered = await this.userRepository.isEmailRegistered(email);
      if (isEmailRegistered) {
        return ServiceResponse.conflict("El email ya está registrado", null);
      }
      this.userRepository.registerAsync(first_name, last_name, email, password, "user");
      return ServiceResponse.created("Usuario registrado con éxito", null);
    } catch (ex) {
      return ServiceResponse.failure("Error interno del servidor", null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  async login(email: string, password: string): Promise<ServiceResponse<Customer | null>> {
    try {
      const user = await this.userRepository.findByEmailAndPassword(email, password);
      if (!user) {
        return ServiceResponse.failure("Usuario no encontrado", null, StatusCodes.NOT_FOUND);
      }
      const payload = {
        id: user.customer_id,
        first_name: user.first_name,
        last_name: user.first_name,
        is_admin: user.role === "admin",
      };

      if (!process.env.JWT_ACCESS_TOKEN_SECRET) {
        throw new Error("JWT_ACCESS_TOKEN_SECRET is not defined");
      }
      //Access token.
      const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: "15m" });

      if (!process.env.JWT_REFRESH_TOKEN_SECRET) {
        throw new Error("JWT_REFRESH_TOKEN_SECRET is not defined");
      }
      //Refresh token.
      const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET, { expiresIn: "7d" });

      const userResponse = {
        success: true,
        message: "Inicio de sesion exitoso",
        first_name: user.first_name,
        last_name: user.last_name,
        accessToken,
        refreshToken,
        is_admin: user.role === "admin",
      };

      return ServiceResponse.success<Customer>("User found", userResponse);
    } catch (ex) {
      return ServiceResponse.failure("Error interno del servidor", null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  async refreshToken(authHeader: string | undefined): Promise<ServiceResponse<any>> {
    try {
      if (!authHeader) {
        return ServiceResponse.unauthorized("Token de autenticacion no proporcionado", null);
      }
      const [bearer, token] = authHeader.split(" ");
      if (bearer !== "Bearer" || !token) {
        return ServiceResponse.unauthorized("Formato de token no válido", null);
      }
      if (!process.env.JWT_REFRESH_TOKEN_SECRET) {
        throw new Error("JWT_REFRESH_TOKEN_SECRET is not defined");
      }
      const user = jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET) as UserPayload;

      const payload = {
        id: user.customer_id,
        first_name: user.first_name,
        last_name: user.first_name,
        is_admin: user.role,
      };
      if (!process.env.JWT_ACCESS_TOKEN_SECRET) {
        throw new Error("JWT_ACCESS_TOKEN_SECRET is not defined");
      }
      const newAccessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: "15m" });

      const response = {
        accessToken: newAccessToken,
      };

      return ServiceResponse.success("Accesstoken renovado", response);
    } catch (ex) {
      return ServiceResponse.failure("Error interno del servidor", null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
}

export const userService = new UserService();
