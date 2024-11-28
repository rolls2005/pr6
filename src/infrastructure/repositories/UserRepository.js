const User = require("../models/user");

class UserRepository {
  async createUser(userData) {
    return await User.createUser(userData);
  }

  async getUserById(userId) {
    return await User.getUserById(userId);
  }

  async getAllUsers() {
    return await User.getAllUsers();
  }

  async getUserByUsername(username) {
	return await User.getUserByUsername(username);
  }
}

module.exports = new UserRepository();
