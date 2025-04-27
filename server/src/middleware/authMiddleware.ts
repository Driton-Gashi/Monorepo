import type { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";

import { RequestHandler } from 'express';

export const authMiddleware: RequestHandler = (
  req, 
  res, 
  next
) => {
  const token = req.cookies?.token;

  if (!token) {
    if (req.headers.accept?.includes("application/json")) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    res.redirect("/login");
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded as JwtPayload;
    next();
  } catch (err) {
    if (req.headers.accept?.includes("application/json")) {
      res.status(401).json({ error: "Invalid token" });
      return;
    }
    res.redirect("/login");
  }
};