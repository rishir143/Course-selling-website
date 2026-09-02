import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRouter from "./router/user.js";
import adminRouter from "./router/admin.js";
import courseRouter from "./router/courses.js";

dotenv.config();

const app = express();
app.use(express.json()); // Middleware to parse incoming JSON bodies

// Mount routers with base path prefixes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);

// Server connection & Database initialization
async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to the Database");

    app.listen(process.env.PORT, () => {
      console.log(`the server is runing at the port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
  }
}

main();
