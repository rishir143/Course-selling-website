import { Router } from "express";
import bcrypt from "bcrypt";
import { adminModel, courseModel } from "../db.js";
import jwt from "jsonwebtoken";
import { JWT_ADMIN_SECRET } from "../utils/config.js";
import { adminMiddleware } from "../middleware/admin.js";

const adminRouter = Router();

adminRouter.post("/signup", async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    await adminModel.create({
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
});

adminRouter.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await adminModel.find({ email });

    if (!admin) {
      return res.status(403).json({ message: "Incorrect credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, admin.user);

    if (!passwordMatch) {
      return res.status(403).json({
        message: "Incorrect credentials",
      });
    }

    const token = jwt.sign({ id: admin._id }, JWT_ADMIN_SECRET);
    return res.status(200).json(token);
  } catch (error) {
    return res.status(403).json({
      message: "Incorrect credentials",
    });
  }
});

adminRouter.post("/courses", adminMiddleware, async (req, res) => {
  try {
    const adminId = req.adminId;
    const { title, description, imageUrl, price } = req.body;

    const course = await courseModel.create({
      title,
      description,
      imageUrl,
      price,
      creatorId: adminId,
    });

    return res
      .status(200)
      .json({ message: "Course created successfully", courseId: course._id });
  } catch (error) {
    return res.status(403).json({
      message: "Incorrect credentials",
    });
  }
});

export default adminRouter;
