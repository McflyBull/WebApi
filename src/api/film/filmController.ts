import { handleServiceResponse } from "@/common/utils/httpHandlers";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import type { FilmDTO } from "./filmModel";
import type { FilmService } from "./filmService";

export class FilmController {
  constructor(private service: FilmService) {}

  async create(req: Request, res: Response): Promise<void> {
    const FilmDTO = req.body as FilmDTO;
    const serviceResponse = await this.service.createFilm(FilmDTO);
    handleServiceResponse(serviceResponse, res);
  }

  async getNowPlaying(_req: Request, res: Response): Promise<void> {
    const serviceResponse = await this.service.getAllFilms(false);
    handleServiceResponse(serviceResponse, res);
  }

  async getUpcoming(_req: Request, res: Response): Promise<void> {
    const serviceResponse = await this.service.getAllFilms(true);
    handleServiceResponse(serviceResponse, res);
  }

  async getAll(_req: Request, res: Response): Promise<void> {
    const serviceResponse = await this.service.getAllFilms();
    handleServiceResponse(serviceResponse, res);
  }

  async getById(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      handleServiceResponse(
        {
          success: false,
          message: "Invalid input: ID must be a number",
          responseObject: null,
          statusCode: StatusCodes.BAD_REQUEST,
        },
        res,
      );
      return;
    }
    const serviceResponse = await this.service.getFilmById(id);
    handleServiceResponse(serviceResponse, res);
  }

  async update(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      handleServiceResponse(
        {
          success: false,
          message: "Invalid input: ID must be a number",
          responseObject: null,
          statusCode: StatusCodes.BAD_REQUEST,
        },
        res,
      );
      return;
    }
    const FilmDTO = req.body as Partial<FilmDTO>;
    const serviceResponse = await this.service.updateFilm(id, FilmDTO);
    handleServiceResponse(serviceResponse, res);
  }

  async delete(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      handleServiceResponse(
        {
          success: false,
          message: "Invalid input: ID must be a number",
          responseObject: null,
          statusCode: StatusCodes.BAD_REQUEST,
        },
        res,
      );
      return;
    }
    const serviceResponse = await this.service.deleteFilm(id);
    handleServiceResponse(serviceResponse, res);
  }
}
