import { Router } from "express";
import bcrypt from "bcrypt";
import { courseModel, purchaseModel, userModel } from "../db.js";
import jwt from "jsonwebtoken";
import { JWT_USER_SECRET } from "../utils/config.js";
import { userMiddleware } from "../middleware/user.js";

const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    await userModel.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    return res.json({ message: "User signed up successfully" });
  } catch (error) {
    return (
      res.status(400),
      json({ message: "User already exists or invalid data" })
    );
  }

  return res.json({ message: "user sign up end point" });
});

// sign in
userRouter.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(403).json({ message: "Incorrect credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(403).json({
        message: "Incorrect credentials",
      });
    }

    //Generate JWT token

    const token = jwt.sign({ id: user._id }, JWT_USER_SECRET);

    return res.json({ token });
  } catch (error) {
    return res.status(403).json({
      message: "Incorrect credentials",
    });
  }
});

userRouter.get("/purchases", userMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const purchases = await purchaseModel.find({ userId });
    const courseData = await courseModel.find({
      _id: { $in: purchases.map((p) => p.courseId) },
    });
    return res.json({ purchases, courseData });
  } catch (error) {
    return res.status(403).json({
      message: "token not found",
    });
  }
});

export default userRouter;
