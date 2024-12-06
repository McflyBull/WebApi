import { commonValidations } from "@/common/utils/commonValidation";
import { Film } from "@/entities/Film";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

// Esquema de validación para la entidad Film
export const FilmSchema = z.object({
  film_id: z.number(),
  title: z.string(),
  overview: z.string(),
  poster_path: z.string(),
  release_date: z.string(),
  vote_average: z.number().positive(),
});

export type FilmDTO = z.infer<typeof FilmSchema>;

// Validación para endpoints
export const GetFilmSchema = z.object({
  params: z.object({ id: commonValidations.id }),
});

export const CreateFilmSchema = z.object({
  body: FilmSchema.omit({
    film_id: true,
  }),
});

export const UpdateFilmSchema = z.object({
  params: z.object({ id: commonValidations.id }),
  body: FilmSchema.partial().omit({
    film_id: true,
  }),
});
