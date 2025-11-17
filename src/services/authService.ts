import e, { Request, Response } from "express";
import User from "@/models/userModel";
import Role from "@/models/roleModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";

const generateToken = (userId: string, roles: Types.ObjectId[]): string => {
  const roleStrings = roles.map((r) => r.toString());
  return jwt.sign({ userId, roles: roleStrings }, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });
};
export const registerService = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, userName, email, password, phone } = req.body;

    const existingUser = await User.findOne({
      $or: [{ userName }, { email }, { phone }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "username or email already exists" });
    }
    const passwordHash = await bcrypt.hash(password, 10);

    const customerRole = await Role.findOne({ name: "customer" });
    if (!customerRole) {
      return res
        .status(500)
        .json({ message: 'Default role "customer" not found' });
    }

    const newUser = new User({
      firstName,
      lastName,
      userName,
      email,
      password: passwordHash,
      phone,
      roles: [customerRole?._id],
    });
    await newUser.save();

    const rolesArray = [customerRole.name];
    res.status(201).json({
      success: true,
      data: {
        ...newUser.toObject(),
        roles: rolesArray,
      },
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const loginService = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const existEmail = await User.findOne({ email });
    if (!existEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      existEmail?.password
    );
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    const token = generateToken(
      existEmail._id,
      existEmail.roles as Types.ObjectId[]
    );

    return res.status(200).json({
      success: true,
      data: existEmail,
      token,
      message: "User logged in successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const logoutService = async (_req: Request, res: Response) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
