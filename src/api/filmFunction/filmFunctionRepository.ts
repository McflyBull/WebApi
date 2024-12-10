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
      relations: ["film"],
    });
  }

  async findById(id: number): Promise<FilmFunction | null> {
    return await this.repository.findOne({
      where: { function_id: id },
      relations: ["film"],
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
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 1. Primero eliminamos los tickets asociados
      await queryRunner.manager.query("DELETE FROM ticket WHERE function_id = ?", [id]);

      // 2. Luego eliminamos los asientos asociados
      await queryRunner.manager.query("DELETE FROM seat WHERE functionFunctionId = ?", [id]);

      // 3. Finalmente eliminamos la función
      await queryRunner.manager.query("DELETE FROM film_function WHERE function_id = ?", [id]);

      await queryRunner.commitTransaction();
      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
