import jwt from "jsonwebtoken";
import { JWT_ADMIN_SECRET } from "../utils/config.js";

export const adminMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({
      message: "authorization token not found",
    });
  }
  try {
    const decoded = jwt.verify(token, JWT_ADMIN_SECRET);

    req.adminId = decoded.id;

    next();
  } catch (error) {
    return res.status(403).json({
      message: "Invalid or Expired token",
    });
  }
};
