import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Users } from "../Models/Users";

interface decoded {
  id: string;
  email: string;
  exp?: number;
  iat?: number;
}
export const authenticateToken = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const autheader = req.headers["authorization"];
    const token = autheader && autheader.split(" ")[1];

    if (token == null) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as decoded;
    console.log("Decoded token:", decoded);
    const user = Users.findOne({ _id: decoded.id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        error: "Token has expired",
      });
    }

    return res.status(500).json({
      error: "Internal server error during header validation",
    });
  }
};
