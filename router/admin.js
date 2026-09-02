import { Router } from "express";

const adminRouter = Router();

adminRouter.post("/siginin", (req, res) => {
  return res.json({
    message: "Admin sigin endpoint",
  });
});

adminRouter.post("/signup", (req, res) => {
  return res.json({
    message: "Admin Singup endpoint",
  });
});

adminRouter.post("/courses", (req, res) => {
  return res.json({
    message: "admin create courses endpoints",
  });
});

export default adminRouter;
