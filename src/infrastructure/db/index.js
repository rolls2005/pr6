const { MongoClient } = require("mongodb");

let db;

const connectDatabase = async () => {
  try {
    const client = await MongoClient.connect(
      process.env.APP_MONGO_DATABASE_URL
    );
    db = client.db();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};

const getDb = () => db;

module.exports = { connectDatabase, getDb };
