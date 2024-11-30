import type { FilmFunction } from "@/entities/FilmFunction";
import { StatusCodes } from "http-status-codes";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { FilmFunctionDTO } from "../filmFunctionModel";
import { FilmFunctionRepository } from "../filmFunctionRepository";
import { FilmFunctionService } from "../filmFunctionService";

describe("FilmFunctionService", () => {
  let service: FilmFunctionService;
  let repository: FilmFunctionRepository;

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

  beforeEach(() => {
    repository = new FilmFunctionRepository();
    service = new FilmFunctionService(repository);

    // Mock repository methods
    vi.spyOn(repository, "findAll").mockResolvedValue(mockFilmFunctions);
    vi.spyOn(repository, "findById").mockImplementation((id: number) =>
      Promise.resolve(mockFilmFunctions.find((ff) => ff.function_id === id) || null),
    );
    vi.spyOn(repository, "create").mockImplementation((filmFunction: Partial<FilmFunction>) =>
      Promise.resolve({
        ...filmFunction,
        function_id: 3,
        film: null as any,
        tickets: [],
        seats: [],
      } as FilmFunction),
    );
    vi.spyOn(repository, "update").mockImplementation((id: number, filmFunction: Partial<FilmFunction>) =>
      Promise.resolve(
        mockFilmFunctions.find((ff) => ff.function_id === id)
          ? { ...mockFilmFunctions.find((ff) => ff.function_id === id)!, ...filmFunction }
          : null,
      ),
    );
    vi.spyOn(repository, "delete").mockImplementation((id: number) =>
      Promise.resolve(mockFilmFunctions.some((ff) => ff.function_id === id)),
    );
  });

  describe("getAllFilmFunctions", () => {
    it("should return all film functions", async () => {
      // Act
      const result = await service.getAllFilmFunctions();

      // Assert
      expect(result.success).toBeTruthy();
      expect(result.message).toContain("Film functions retrieved successfully");
      expect(result.responseObject).toEqual(mockFilmFunctions);
      expect(repository.findAll).toHaveBeenCalledTimes(1);
    });

    it("should handle empty results", async () => {
      // Arrange
      vi.spyOn(repository, "findAll").mockResolvedValueOnce([]);

      // Act
      const result = await service.getAllFilmFunctions();

      // Assert
      expect(result.success).toBeFalsy();
      expect(result.message).toContain("No film functions found");
      expect(result.statusCode).toBe(StatusCodes.NOT_FOUND);
    });

    it("should handle errors", async () => {
      // Arrange
      const errorMessage = "Database error";
      vi.spyOn(repository, "findAll").mockRejectedValueOnce(new Error(errorMessage));

      // Act
      const result = await service.getAllFilmFunctions();

      // Assert
      expect(result.success).toBeFalsy();
      expect(result.message).toContain("An error occurred");
      expect(result.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    });
  });

  describe("getFilmFunctionById", () => {
    it("should return a film function by id", async () => {
      // Arrange
      const testId = 1;
      const expectedFilmFunction = mockFilmFunctions.find((ff) => ff.function_id === testId)!;

      // Act
      const result = await service.getFilmFunctionById(testId);

      // Assert
      expect(result.success).toBeTruthy();
      expect(result.message).toContain("Film function retrieved successfully");
      expect(result.responseObject).toEqual(expectedFilmFunction);
      expect(repository.findById).toHaveBeenCalledWith(testId);
    });

    it("should handle non-existent film function", async () => {
      // Arrange
      const testId = 999;

      // Act
      const result = await service.getFilmFunctionById(testId);

      // Assert
      expect(result.success).toBeFalsy();
      expect(result.message).toContain("Film function not found");
      expect(result.statusCode).toBe(StatusCodes.NOT_FOUND);
    });

    it("should handle errors", async () => {
      // Arrange
      const testId = 1;
      const errorMessage = "Database error";
      vi.spyOn(repository, "findById").mockRejectedValueOnce(new Error(errorMessage));

      // Act
      const result = await service.getFilmFunctionById(testId);

      // Assert
      expect(result.success).toBeFalsy();
      expect(result.message).toContain("An error occurred");
      expect(result.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    });
  });

  describe("createFilmFunction", () => {
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
      const result = await service.createFilmFunction(newFilmFunction);

      // Assert
      expect(result.success).toBeTruthy();
      expect(result.message).toContain("Film function created successfully");
      expect(result.responseObject).toHaveProperty("function_id", 3);
      expect(repository.create).toHaveBeenCalledWith(newFilmFunction);
    });

    it("should handle errors", async () => {
      // Arrange
      const newFilmFunction: FilmFunctionDTO = {
        film_id: 1,
        function_date: new Date("2024-01-01"),
        start_time: "20:00",
        end_time: "22:00",
        ticket_price: 15.0,
      };
      const errorMessage = "Database error";
      vi.spyOn(repository, "create").mockRejectedValueOnce(new Error(errorMessage));

      // Act
      const result = await service.createFilmFunction(newFilmFunction);

      // Assert
      expect(result.success).toBeFalsy();
      expect(result.message).toContain("An error occurred");
      expect(result.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    });
  });

  describe("updateFilmFunction", () => {
    it("should update an existing film function", async () => {
      // Arrange
      const testId = 1;
      const updateData: Partial<FilmFunctionDTO> = {
        ticket_price: 20.0,
      };

      // Act
      const result = await service.updateFilmFunction(testId, updateData);

      // Assert
      expect(result.success).toBeTruthy();
      expect(result.message).toContain("Film function updated successfully");
      expect(result.responseObject).toHaveProperty("ticket_price", 20.0);
      expect(repository.update).toHaveBeenCalledWith(testId, updateData);
    });

    it("should handle non-existent film function", async () => {
      // Arrange
      const testId = 999;
      const updateData: Partial<FilmFunctionDTO> = {
        ticket_price: 20.0,
      };

      // Act
      const result = await service.updateFilmFunction(testId, updateData);

      // Assert
      expect(result.success).toBeFalsy();
      expect(result.message).toContain("Film function not found");
      expect(result.statusCode).toBe(StatusCodes.NOT_FOUND);
    });

    it("should handle errors", async () => {
      // Arrange
      const testId = 1;
      const updateData: Partial<FilmFunctionDTO> = {
        ticket_price: 20.0,
      };
      const errorMessage = "Database error";
      vi.spyOn(repository, "update").mockRejectedValueOnce(new Error(errorMessage));

      // Act
      const result = await service.updateFilmFunction(testId, updateData);

      // Assert
      expect(result.success).toBeFalsy();
      expect(result.message).toContain("An error occurred");
      expect(result.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    });
  });

  describe("deleteFilmFunction", () => {
    it("should delete an existing film function", async () => {
      // Arrange
      const testId = 1;

      // Act
      const result = await service.deleteFilmFunction(testId);

      // Assert
      expect(result.success).toBeTruthy();
      expect(result.message).toContain("Film function deleted successfully");
      expect(result.responseObject).toBe(true);
      expect(repository.delete).toHaveBeenCalledWith(testId);
    });

    it("should handle non-existent film function", async () => {
      // Arrange
      const testId = 999;

      // Act
      const result = await service.deleteFilmFunction(testId);

      // Assert
      expect(result.success).toBeFalsy();
      expect(result.message).toContain("Film function not found");
      expect(result.statusCode).toBe(StatusCodes.NOT_FOUND);
    });

    it("should handle errors", async () => {
      // Arrange
      const testId = 1;
      const errorMessage = "Database error";
      vi.spyOn(repository, "delete").mockRejectedValueOnce(new Error(errorMessage));

      // Act
      const result = await service.deleteFilmFunction(testId);

      // Assert
      expect(result.success).toBeFalsy();
      expect(result.message).toContain("An error occurred");
      expect(result.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    });
  });
});
