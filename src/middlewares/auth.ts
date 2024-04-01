import { VerifiedCallback } from "passport-jwt";
import { User } from "../models/User";
import { HttpError } from "../utils/misc/HttpError";
import { NextFunction, Response, Request } from "express";
import { verifyToken } from "../utils/jwt";



export const checkBearerToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new HttpError(401, 'Access token not provided')
  }
  try {
    const data = await verifyToken(authHeader.split(" ")[1]);
    const user = await User.findById(data.accountId);
    if (!user) {
      throw new HttpError(401, "Unauthorized")
    }
    console.log(user);
    req.user = user;
  } catch (error) {
    throw new HttpError(500, "Failed to authenticate")
  }
  return next();
};