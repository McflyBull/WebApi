import { ServiceResponse } from "@/common/models/serviceResponse";
import type { FilmFunction } from "@/entities/FilmFunction";
import { logger } from "@/server";
import { StatusCodes } from "http-status-codes";
import type { FilmFunctionDTO } from "./filmFunctionModel";
import type { FilmFunctionRepository } from "./filmFunctionRepository";

export class FilmFunctionService {
  constructor(private repository: FilmFunctionRepository) {}

  async getAllFilmFunctions(): Promise<ServiceResponse<FilmFunction[] | null>> {
    try {
      const functions = await this.repository.findAll();
      if (!functions || functions.length === 0) {
        return ServiceResponse.failure("No film functions found", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<FilmFunction[]>("Film functions retrieved successfully", functions);
    } catch (ex) {
      const errorMessage = `Error retrieving film functions: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while retrieving film functions",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getFilmFunctionById(id: number): Promise<ServiceResponse<FilmFunction | null>> {
    try {
      const filmFunction = await this.repository.findById(id);
      if (!filmFunction) {
        return ServiceResponse.failure("Film function not found", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<FilmFunction>("Film function retrieved successfully", filmFunction);
    } catch (ex) {
      const errorMessage = `Error finding film function with id ${id}: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while retrieving the film function",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createFilmFunction(filmFunctionDto: FilmFunctionDTO): Promise<ServiceResponse<FilmFunction | null>> {
    try {
      const created = await this.repository.create(filmFunctionDto);
      return ServiceResponse.success<FilmFunction>("Film function created successfully", created);
    } catch (ex) {
      const errorMessage = `Error creating film function: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while creating the film function",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateFilmFunction(
    id: number,
    filmFunctionDto: Partial<FilmFunctionDTO>,
  ): Promise<ServiceResponse<FilmFunction | null>> {
    try {
      const updated = await this.repository.update(id, filmFunctionDto);
      if (!updated) {
        return ServiceResponse.failure("Film function not found", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<FilmFunction>("Film function updated successfully", updated);
    } catch (ex) {
      const errorMessage = `Error updating film function with id ${id}: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while updating the film function",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteFilmFunction(id: number): Promise<ServiceResponse<boolean>> {
    try {
      const deleted = await this.repository.delete(id);
      if (!deleted) {
        return ServiceResponse.failure("Film function not found", false, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<boolean>("Film function deleted successfully", true);
    } catch (ex) {
      const errorMessage = `Error deleting film function with id ${id}: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while deleting the film function",
        false,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
