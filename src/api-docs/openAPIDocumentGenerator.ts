import { filmFunctionRegistry } from "@/api/filmFunction/filmFunctionRouter";
import { healthCheckRegistry } from "@/api/healthCheck/healthCheckRouter";
import { ticketRegistry } from "@/api/ticket/ticketRouter";
import { userRegistry } from "@/api/user/userRouter";
import { OpenAPIRegistry, OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";

export const generateOpenAPIDocument = () => {
  const registry = new OpenAPIRegistry([healthCheckRegistry, userRegistry, filmFunctionRegistry, ticketRegistry]);

  const generator = new OpenApiGeneratorV3(registry.definitions);

  return generator.generateDocument({
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Cinema API",
      description: "API for managing a cinema system",
    },
    externalDocs: {
      description: "View the raw OpenAPI Specification in JSON format",
      url: "/swagger.json",
    },
  });
};
