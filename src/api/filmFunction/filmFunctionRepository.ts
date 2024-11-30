import { AppDataSource } from "@/database/data-source";
import { FilmFunction } from "@/entities/FilmFunction";
import type { Repository } from "typeorm";

export class FilmFunctionRepository {
  private repository: Repository<FilmFunction>;

  constructor() {
    this.repository = AppDataSource.getRepository(FilmFunction);
  }

  async findAll(): Promise<FilmFunction[]> {
    return await this.repository.find({
      relations: ["film", "tickets", "seats"],
    });
  }

  async findById(id: number): Promise<FilmFunction | null> {
    return await this.repository.findOne({
      where: { function_id: id },
      relations: ["film", "tickets", "seats"],
    });
  }

  async create(filmFunction: Partial<FilmFunction>): Promise<FilmFunction> {
    const newFilmFunction = this.repository.create(filmFunction);
    return await this.repository.save(newFilmFunction);
  }

  async update(id: number, filmFunction: Partial<FilmFunction>): Promise<FilmFunction | null> {
    await this.repository.update(id, filmFunction);
    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }
}
