const fastifySwagger = require("@fastify/swagger");
const fastifySwaggerUI = require("@fastify/swagger-ui");

async function swagger(fastify) {
  // Налаштування Swagger
  await fastify.register(fastifySwagger, {
    mode: "dynamic",
    openapi: {
      info: {
        title: "API Documentation",
        description: "Automatically generated API documentation",
        version: "1.0.0",
      },
      servers: [{ url: "http://localhost/api" }],
    },
  });

  // Налаштування Swagger UI
  await fastify.register(fastifySwaggerUI, {
    routePrefix: "/docs",
    swagger: {
      info: {
        title: "API Documentation",
        version: "1.0.0",
      },
    },
    exposeRoute: true,
  });
}

module.exports = swagger;
