import { handleServiceResponse } from "@/common/utils/httpHandlers";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import type { FilmFunctionDTO } from "./filmFunctionModel";
import type { FilmFunctionService } from "./filmFunctionService";

export class FilmFunctionController {
  constructor(private service: FilmFunctionService) {}

  async create(req: Request, res: Response): Promise<void> {
    const filmFunctionDto = req.body as FilmFunctionDTO;
    const serviceResponse = await this.service.createFilmFunction(filmFunctionDto);
    handleServiceResponse(serviceResponse, res);
  }

  async getAll(_req: Request, res: Response): Promise<void> {
    const serviceResponse = await this.service.getAllFilmFunctions();
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
    const serviceResponse = await this.service.getFilmFunctionById(id);
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
    const filmFunctionDto = req.body as Partial<FilmFunctionDTO>;
    const serviceResponse = await this.service.updateFilmFunction(id, filmFunctionDto);
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
    const serviceResponse = await this.service.deleteFilmFunction(id);
    handleServiceResponse(serviceResponse, res);
  }
}
