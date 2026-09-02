import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

dotenv.config();

const app = express();
app.use(express.json()); // Middleware to parse incoming JSON bodies

// Server connection & Database initialization
async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Connected to the Database");

  app.listen(process.env.PORT, () => {
    console.log(`the server is runing at the port ${process.env.PORT}`);
  });
}
