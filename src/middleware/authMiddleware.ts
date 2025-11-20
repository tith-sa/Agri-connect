import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const authenicate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded as JwtPayload;
    next();
  } catch (error) {
    res.status(401).json({ message: "Authentication failed." });
  }
};

export const authorize = (allowRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.roles;
    if (!userRole.some((role: string) => allowRoles.includes(role))) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }
    next();
  };
};
