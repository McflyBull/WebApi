import { AppDataSource } from "@/database/data-source";
import { Film } from "@/entities";
import type { Repository } from "typeorm";

export class FilmRepository {
  private repository: Repository<Film>;

  constructor() {
    this.repository = AppDataSource.getRepository(Film);
  }

  async findAll(isUpcoming?: boolean): Promise<Film[]> {
    return await this.repository.find({
      where: { is_upcoming: isUpcoming },
      relations: ["functions"],
    });
  }

  async findById(id: number): Promise<Film | null> {
    return await this.repository.findOne({
      where: { film_id: id },
      relations: ["functions", "functions.seats"],
    });
  }

  async create(film: Partial<Film>): Promise<Film> {
    const newFilm = this.repository.create(film);
    return await this.repository.save(newFilm);
  }

  async update(id: number, film: Partial<Film>): Promise<Film | null> {
    await this.repository.update(id, film);
    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }
}
