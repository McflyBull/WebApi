import { commonValidations } from "@/common/utils/commonValidation";
import { FilmFunction } from "@/entities/FilmFunction";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

// Esquema de validación para la entidad FilmFunction
export const FilmFunctionSchema = z.object({
  function_id: z.number().optional(),
  film_id: z.number(),
  function_date: z.date(),
  start_time: z.string(),
  end_time: z.string(),
  ticket_price: z.number().positive(),
});

export type FilmFunctionDTO = z.infer<typeof FilmFunctionSchema>;

// Validación para endpoints
export const GetFilmFunctionSchema = z.object({
  params: z.object({ id: commonValidations.id }),
});

// Nuevo esquema para la creación de funciones
export const CreateFilmFunctionRequestSchema = z.object({
  film_id: z.number(),
  schedules: z.array(z.string()),
  start_date: z.string(),
  end_date: z.string(),
});

// Actualizar el schema de creación
export const CreateFilmFunctionSchema = z.object({
  body: CreateFilmFunctionRequestSchema,
});

export const UpdateFilmFunctionSchema = z.object({
  params: z.object({ id: commonValidations.id }),
  body: FilmFunctionSchema.partial().omit({
    function_id: true,
  }),
});
