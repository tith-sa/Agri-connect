import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

type SwaggerOptions = {
  definition: object;
  apis: string[];
};
const options: SwaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Agri Connect API",
      version: "1.0.0",
      description: "API documentation for Agri Connect",
    },
    servers: [
      {
        url: "http://localhost:4000/api/v1",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  // Path to the API docs
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

// Function to initialize Swagger in Express
export const initSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
