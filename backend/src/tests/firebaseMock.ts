import { Request, Response, NextFunction } from "express";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.user = { uid: "testUserId" }; // Mock user ID
  next();
};
