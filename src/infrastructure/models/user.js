const { getDb } = require("../db");
const { ObjectId } = require("mongodb");

const collectionName = "users";

const createUser = async (userData) => {
  const db = getDb();
  await db.collection(collectionName).insertOne(userData);
};

const getUserById = async (userId) => {
  const db = getDb();
  return await db
    .collection(collectionName)
    .findOne({ _id: ObjectId.createFromHexString(userId) });
};

const getAllUsers = async () => {
  const db = getDb();
  return await db.collection(collectionName).find().toArray();
};

const getUserByUsername = async (username) => {
  const db = getDb();
  return await db.collection(collectionName).findOne({ username });
};

module.exports = { createUser, getUserById, getAllUsers, getUserByUsername };
