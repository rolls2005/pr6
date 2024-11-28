const UserService = require("../../application/services/UserService");
let fastifyInstance;

class AuthController {
  static init(fastify) {
    fastifyInstance = fastify;
  }

  async signUp(request, reply) {
    await UserService.createUser(request.body);

    reply.send({ message: "User created successfully!" });
  }

  async signIn(request, reply) {
    const { username, password } = request.body;

    const user = await UserService.getUserByUsername(username);

    if (!user || user.password !== password) {
      return reply.status(401).send({ error: "Invalid username or password" });
    }

    const accessToken = fastifyInstance.jwt.sign(
      { id: user._id.toString() },
      { expiresIn: "15m" }
    );
    const refreshToken = fastifyInstance.jwt.sign(
      { id: user._id.toString(), username: user.username },
      { expiresIn: "2d" }
    );

    reply
      .setCookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
		path: "/api",
      })
      .send({ accessToken });
  }

  async logOut(request, reply) {
    reply
      .clearCookie("refreshToken", {path: "/api"})
      .send({ message: "User logged out successfully!" });
  }

  async refresh(request, reply) {
    const { refreshToken } = request.cookies;

    try {
      const decoded = fastifyInstance.jwt.verify(refreshToken);

      const user = await UserService.getUserById(decoded.id);

      if (!user) {
        return reply.status(401).send();
      }

      const accessToken = fastifyInstance.jwt.sign(
        {
          id: decoded.id,
        },
        { expiresIn: "15m" }
      );

      reply.send({ accessToken });
    } catch (err) {
      return reply.status(401).send();
    }
  }
}

module.exports = AuthController;
