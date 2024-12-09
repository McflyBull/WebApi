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
      order:
        isUpcoming === undefined
          ? {
              film_id: "DESC",
            }
          : undefined,
    });
  }

  async findById(id: number): Promise<Film | null> {
    return await this.repository.findOne({
      where: { film_id: id },
      relations: ["functions", "functions.seats", "functions.tickets"],
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
    //Todo esto es para que se eliminen los tickets y asientos relacionados con la película, porque la base de datos no tiene el cascade delete
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 1. Eliminamos los tickets
      await queryRunner.manager.query(
        "DELETE t FROM ticket t INNER JOIN film_function f ON t.function_id = f.function_id WHERE f.film_id = ?",
        [id],
      );

      // 2. Eliminamos los asientos
      await queryRunner.manager.query(
        "DELETE s FROM seat s INNER JOIN film_function f ON s.functionFunctionId = f.function_id WHERE f.film_id = ?",
        [id],
      );

      // 3. Eliminamos las funciones
      await queryRunner.manager.query("DELETE FROM film_function WHERE film_id = ?", [id]);

      // 4. Eliminamos la película
      await queryRunner.manager.query("DELETE FROM film WHERE film_id = ?", [id]);

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
