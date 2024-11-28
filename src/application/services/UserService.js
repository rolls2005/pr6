const UserRepository = require("../../infrastructure/repositories/UserRepository");

class UserService {
  async createUser(userData) {
    return await UserRepository.createUser(userData);
  }

  async getUserById(userId) {
    return await UserRepository.getUserById(userId);
  }

  async getAllUsers() {
    return await UserRepository.getAllUsers();
  }

  async getUserByUsername(username) {
	return await UserRepository.getUserByUsername(username);
  }
}

module.exports = new UserService();
