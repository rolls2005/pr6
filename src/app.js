const fastify = require("fastify")();
const jwt = require("@fastify/jwt");
const cookie = require("@fastify/cookie");

const { connectDatabase } = require("./infrastructure/db");
const routes = require("./routes");
const swagger = require("./plugins/swagger");

connectDatabase();

swagger(fastify);

fastify.register(jwt, {
  secret: process.env.JWT_SECRET,
});

fastify.register(cookie);
fastify.register(routes);

fastify.decorate("authenticate", async (request, reply) => {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.status(401).send({ error: "Unauthorized" });
  }
});

fastify.listen({ port: 3000, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server running at ${address}`);
});