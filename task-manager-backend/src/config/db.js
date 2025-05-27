const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();

const client = new MongoClient(process.env.MONGODB_URI);
let db;

async function connectDB() {
  await client.connect();
  db = client.db(); // Default DB from connection URI
  console.log("✅ Connected to MongoDB");
  return db;
}

function getDB() {
  if (!db) throw new Error("❌ Database not connected");
  return db;
}

module.exports = { connectDB, getDB };
