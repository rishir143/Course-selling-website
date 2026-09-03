import { Router } from "express";
import { courseModel, purchaseModel } from "../db.js";
import { userMiddleware } from "../middleware/user.js";

const courseRouter = Router();
//  Purchase a Course (Protected)
courseRouter.post("/purchase", userMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({ message: "Course ID is required" });
    }

    const course = await courseModel.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Check if user already purchased the course
    const existingPurchase = await purchaseModel.findOne({ userId, courseId });
    if (existingPurchase) {
      return res
        .status(400)
        .json({ message: "You have already purchased this course" });
    }

    await purchaseModel.create({
      userId,
      courseId,
    });

    return res.status(201).json({ message: "Course purchased successfully" });
  } catch (error) {
    return res.status(403).json({
      message: "Purchase course error",
    });
  }
});

// this is for publid everyone
courseRouter.get("/preview", async (req, res) => {
  try {
    const courses = await courseModel.find({});
    return res.json({ courses });
  } catch (error) {
    return res.status(403).json({
      message: `error while priviewing the course ${error}`,
    });
  }
});

export default courseRouter;
