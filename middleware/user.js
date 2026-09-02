import jwt from "jsonwebtoken";
import { JWT_USER_SECRET } from "../utils/config.js";

export const userMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({
      message: "Token not found: authorization fails",
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_USER_SECRET);
    // Attach user ID extracted from payload to the request object
    req.userId = decoded.id;

    next();
  } catch (error) {
    return res.status(403).json({
      message: "Invalid or Expired token",
    });
  }
};
