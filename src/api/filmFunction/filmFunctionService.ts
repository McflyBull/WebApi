import { ServiceResponse } from "@/common/models/serviceResponse";
import { AppDataSource } from "@/database/data-source";
import { Film } from "@/entities/Film";
import type { FilmFunction } from "@/entities/FilmFunction";
import { logger } from "@/server";
import { addDays, format, parseISO } from "date-fns";
import { StatusCodes } from "http-status-codes";
import type { z } from "zod";
import type { FilmFunctionDTO } from "./filmFunctionModel";
import type { CreateFilmFunctionRequestSchema } from "./filmFunctionModel";
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

  async createFilmFunction(
    createDto: z.infer<typeof CreateFilmFunctionRequestSchema>,
  ): Promise<ServiceResponse<FilmFunction[] | null>> {
    try {
      // 1. Obtener la película para conocer su duración
      const film = await AppDataSource.getRepository(Film).findOne({
        where: { film_id: createDto.film_id },
      });

      if (!film) {
        return ServiceResponse.failure("Film not found", null, StatusCodes.NOT_FOUND);
      }

      const createdFunctions: FilmFunction[] = [];
      const startDate = parseISO(createDto.start_date);
      const endDate = parseISO(createDto.end_date);

      // 2. Iterar por cada día en el rango
      let currentDate = startDate;
      while (currentDate <= endDate) {
        // 3. Para cada día, crear una función por cada horario
        for (const schedule of createDto.schedules) {
          const functionDate = format(currentDate, "yyyy-MM-dd");
          const startTime = schedule;

          // Calcular end_time basado en el runtime de la película
          const [hours, minutes] = schedule.split(":").map(Number);
          const startDateTime = new Date();
          startDateTime.setHours(hours, minutes);
          const endDateTime = new Date(startDateTime.getTime() + film.runtime * 60000); // runtime en minutos
          const endTime = format(endDateTime, "HH:mm");

          const functionData = {
            film_id: createDto.film_id,
            function_date: currentDate,
            start_time: startTime,
            end_time: endTime,
            ticket_price: 12000,
          };

          const created = await this.repository.create(functionData);
          createdFunctions.push(created);
        }

        currentDate = addDays(currentDate, 1);
      }

      return ServiceResponse.success<FilmFunction[]>("Film functions created successfully", createdFunctions);
    } catch (ex) {
      const errorMessage = `Error creating film functions: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while creating the film functions",
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
