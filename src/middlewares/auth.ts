import { VerifiedCallback } from "passport-jwt";
import { User } from "../models/User";
import { HttpError } from "../utils/misc/HttpError";
import { NextFunction, Response, Request } from "express";
import { verifyToken } from "../utils/jwt";



export const checkBearerToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: "Access token not provided" })
  }
  try {
    const data = await verifyToken(authHeader.split(" ")[1]);
    const user = await User.findById(data.accountId);
    if (!user) {
      return res.status(401).json({ message: "Unauthoried" })
    }
    req.user = user;
  } catch (error) {
    return res.status(500).json({ message: "Unauthoried" })
  }
  return next();
};