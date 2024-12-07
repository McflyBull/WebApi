import { ServiceResponse } from "@/common/models/serviceResponse";
import type { Film } from "@/entities";
import { logger } from "@/server";
import { StatusCodes } from "http-status-codes";
import type { FilmDTO } from "./filmModel";
import type { FilmRepository } from "./filmRepository";

export class FilmService {
  constructor(private repository: FilmRepository) {}

  async getAllFilms(isUpcoming?: boolean): Promise<ServiceResponse<Film[] | null>> {
    try {
      const films = await this.repository.findAll(isUpcoming);
      if (!films || films.length === 0) {
        return ServiceResponse.failure("No films found", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<Film[]>("Films retrieved successfully", films);
    } catch (ex) {
      const errorMessage = `Error retrieving films: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while retrieving films",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getFilmById(id: number): Promise<ServiceResponse<Film | null>> {
    try {
      const film = await this.repository.findById(id);
      if (!film) {
        return ServiceResponse.failure("Film not found", null, StatusCodes.NOT_FOUND);
      }

      film.functions = film.functions.map((func) => {
        const occupiedSeatIds = func.tickets?.map((ticket) => ticket.seat_id) || [];

        // Marcamos cada asiento como ocupado o no
        func.seats = func.seats.map((seat) => ({
          ...seat,
          isOccupied: occupiedSeatIds.includes(seat.seat_id),
        }));

        func.tickets = null;

        return func;
      });

      return ServiceResponse.success<Film>("Film retrieved successfully", film);
    } catch (ex) {
      const errorMessage = `Error finding film with id ${id}: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while retrieving the film",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createFilm(filmDto: FilmDTO): Promise<ServiceResponse<Film | null>> {
    try {
      const created = await this.repository.create(filmDto);
      return ServiceResponse.success<Film>("Film created successfully", created);
    } catch (ex) {
      const errorMessage = `Error creating film: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while creating the film",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateFilm(id: number, filmDto: Partial<FilmDTO>): Promise<ServiceResponse<Film | null>> {
    try {
      const updated = await this.repository.update(id, filmDto);
      if (!updated) {
        return ServiceResponse.failure("Film function not found", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<Film>("Film updated successfully", updated);
    } catch (ex) {
      const errorMessage = `Error updating film with id ${id}: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while updating the film",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteFilm(id: number): Promise<ServiceResponse<boolean>> {
    try {
      const deleted = await this.repository.delete(id);
      if (!deleted) {
        return ServiceResponse.failure("Film function not found", false, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<boolean>("Film deleted successfully", true);
    } catch (ex) {
      const errorMessage = `Error deleting film with id ${id}: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while deleting the film",
        false,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
