const UserService = require("../../application/services/UserService");

class UserController {
  async info(request, reply) {
    const user = request.user;
    reply.send({ user });
  }
}

module.exports = UserController;
