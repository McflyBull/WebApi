import type { FilmFunction } from "@/entities/FilmFunction";
import { app } from "@/server";
import { StatusCodes } from "http-status-codes";
import request from "supertest";
import { beforeAll, describe, expect, it, vi } from "vitest";
import type { FilmFunctionDTO } from "../filmFunctionModel";

describe("FilmFunction API Endpoints", () => {
  const mockFilmFunctions: FilmFunction[] = [
    {
      function_id: 1,
      film_id: 1,
      function_date: new Date("2024-01-01"),
      start_time: "14:00",
      end_time: "16:00",
      ticket_price: 15.0,
      film: null as any,
      tickets: [],
      seats: [],
    },
    {
      function_id: 2,
      film_id: 1,
      function_date: new Date("2024-01-01"),
      start_time: "18:00",
      end_time: "20:00",
      ticket_price: 15.0,
      film: null as any,
      tickets: [],
      seats: [],
    },
  ];

  describe("GET /film-functions", () => {
    it("should return a list of film functions", async () => {
      // Act
      const response = await request(app).get("/film-functions");

      // Assert
      expect(response.statusCode).toBe(StatusCodes.OK);
      expect(response.body.success).toBeTruthy();
      expect(response.body.message).toContain("Film functions retrieved successfully");
      expect(response.body.responseObject).toHaveLength(mockFilmFunctions.length);
      response.body.responseObject.forEach((filmFunction: FilmFunction, index: number) => {
        expect(filmFunction.function_id).toBe(mockFilmFunctions[index].function_id);
        expect(filmFunction.film_id).toBe(mockFilmFunctions[index].film_id);
        expect(new Date(filmFunction.function_date)).toEqual(mockFilmFunctions[index].function_date);
        expect(filmFunction.start_time).toBe(mockFilmFunctions[index].start_time);
        expect(filmFunction.end_time).toBe(mockFilmFunctions[index].end_time);
        expect(filmFunction.ticket_price).toBe(mockFilmFunctions[index].ticket_price);
      });
    });
  });

  describe("GET /film-functions/:id", () => {
    it("should return a film function for valid ID", async () => {
      // Arrange
      const testId = 1;
      const expectedFilmFunction = mockFilmFunctions.find((ff) => ff.function_id === testId)!;

      // Act
      const response = await request(app).get(`/film-functions/${testId}`);

      // Assert
      expect(response.statusCode).toBe(StatusCodes.OK);
      expect(response.body.success).toBeTruthy();
      expect(response.body.message).toContain("Film function retrieved successfully");
      expect(response.body.responseObject.function_id).toBe(expectedFilmFunction.function_id);
      expect(response.body.responseObject.film_id).toBe(expectedFilmFunction.film_id);
      expect(new Date(response.body.responseObject.function_date)).toEqual(expectedFilmFunction.function_date);
      expect(response.body.responseObject.start_time).toBe(expectedFilmFunction.start_time);
      expect(response.body.responseObject.end_time).toBe(expectedFilmFunction.end_time);
      expect(response.body.responseObject.ticket_price).toBe(expectedFilmFunction.ticket_price);
    });

    it("should return not found for non-existent ID", async () => {
      // Arrange
      const testId = 999;

      // Act
      const response = await request(app).get(`/film-functions/${testId}`);

      // Assert
      expect(response.statusCode).toBe(StatusCodes.NOT_FOUND);
      expect(response.body.success).toBeFalsy();
      expect(response.body.message).toContain("Film function not found");
    });

    it("should return bad request for invalid ID format", async () => {
      // Act
      const response = await request(app).get("/film-functions/abc");

      // Assert
      expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body.success).toBeFalsy();
      expect(response.body.message).toContain("Invalid input");
    });
  });

  describe("POST /film-functions", () => {
    it("should create a new film function", async () => {
      // Arrange
      const newFilmFunction: FilmFunctionDTO = {
        film_id: 1,
        function_date: new Date("2024-01-01"),
        start_time: "20:00",
        end_time: "22:00",
        ticket_price: 15.0,
      };

      // Act
      const response = await request(app).post("/film-functions").send(newFilmFunction);

      // Assert
      expect(response.statusCode).toBe(StatusCodes.OK);
      expect(response.body.success).toBeTruthy();
      expect(response.body.message).toContain("Film function created successfully");
      expect(response.body.responseObject).toHaveProperty("function_id");
      expect(response.body.responseObject.film_id).toBe(newFilmFunction.film_id);
      expect(new Date(response.body.responseObject.function_date)).toEqual(newFilmFunction.function_date);
      expect(response.body.responseObject.start_time).toBe(newFilmFunction.start_time);
      expect(response.body.responseObject.end_time).toBe(newFilmFunction.end_time);
      expect(response.body.responseObject.ticket_price).toBe(newFilmFunction.ticket_price);
    });

    it("should return bad request for invalid input", async () => {
      // Arrange
      const invalidFilmFunction = {
        film_id: "invalid",
        function_date: "invalid-date",
        start_time: "invalid-time",
        end_time: "invalid-time",
        ticket_price: "invalid-price",
      };

      // Act
      const response = await request(app).post("/film-functions").send(invalidFilmFunction);

      // Assert
      expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body.success).toBeFalsy();
      expect(response.body.message).toContain("Invalid input");
    });
  });

  describe("PUT /film-functions/:id", () => {
    it("should update an existing film function", async () => {
      // Arrange
      const testId = 1;
      const updateData: Partial<FilmFunctionDTO> = {
        ticket_price: 20.0,
      };

      // Act
      const response = await request(app).put(`/film-functions/${testId}`).send(updateData);

      // Assert
      expect(response.statusCode).toBe(StatusCodes.OK);
      expect(response.body.success).toBeTruthy();
      expect(response.body.message).toContain("Film function updated successfully");
      expect(response.body.responseObject.ticket_price).toBe(updateData.ticket_price);
    });

    it("should return not found for non-existent ID", async () => {
      // Arrange
      const testId = 999;
      const updateData: Partial<FilmFunctionDTO> = {
        ticket_price: 20.0,
      };

      // Act
      const response = await request(app).put(`/film-functions/${testId}`).send(updateData);

      // Assert
      expect(response.statusCode).toBe(StatusCodes.NOT_FOUND);
      expect(response.body.success).toBeFalsy();
      expect(response.body.message).toContain("Film function not found");
    });

    it("should return bad request for invalid input", async () => {
      // Arrange
      const testId = 1;
      const invalidUpdateData = {
        ticket_price: "invalid-price",
      };

      // Act
      const response = await request(app).put(`/film-functions/${testId}`).send(invalidUpdateData);

      // Assert
      expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body.success).toBeFalsy();
      expect(response.body.message).toContain("Invalid input");
    });
  });

  describe("DELETE /film-functions/:id", () => {
    it("should delete an existing film function", async () => {
      // Arrange
      const testId = 1;

      // Act
      const response = await request(app).delete(`/film-functions/${testId}`);

      // Assert
      expect(response.statusCode).toBe(StatusCodes.OK);
      expect(response.body.success).toBeTruthy();
      expect(response.body.message).toContain("Film function deleted successfully");
      expect(response.body.responseObject).toBe(true);
    });

    it("should return not found for non-existent ID", async () => {
      // Arrange
      const testId = 999;

      // Act
      const response = await request(app).delete(`/film-functions/${testId}`);

      // Assert
      expect(response.statusCode).toBe(StatusCodes.NOT_FOUND);
      expect(response.body.success).toBeFalsy();
      expect(response.body.message).toContain("Film function not found");
    });

    it("should return bad request for invalid ID format", async () => {
      // Act
      const response = await request(app).delete("/film-functions/abc");

      // Assert
      expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body.success).toBeFalsy();
      expect(response.body.message).toContain("Invalid input");
    });
  });
});
