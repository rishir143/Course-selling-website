import { Router } from "express";

const userRouter = Router();

userRouter.post("/signin", (req, res) => {
  return res.json({
    message: "User sign in end point",
  });
});

userRouter.post("/signup", (req, res) => {
  return res.json({ message: "user sign up end point" });
});

userRouter.get("/purchases", (req, res) => {
  return res.json({
    message: "user purchase endpoint",
  });
});

export default userRouter;
