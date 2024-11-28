const UserController = require("./presentation/controllers/UserController");
const AuthController = require("./presentation/controllers/AuthController");

async function routes(fastify, options) {
	const authController = new AuthController();
	const userController = new UserController();

	AuthController.init(fastify);

	fastify.post("/sign-up", authController.signUp);
	fastify.post("/sign-in", authController.signIn);
	fastify.post("/log-out", authController.logOut);
	fastify.post("/refresh", authController.refresh);
	fastify.get("/info", { preHandler: fastify.authenticate }, userController.info);
}

module.exports = routes;
