import admin from "firebase-admin";
import { Request, Response, NextFunction } from "express";

import serviceAccount from "../serviceAccountKey.json";

declare global {
  namespace Express {
    interface Request {
      user?: {
        uid: string;
      };
    }
  }
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split("Bearer ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
