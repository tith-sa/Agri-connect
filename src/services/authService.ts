import { Request, Response } from "express";
import User from "@/models/userModel";
import Role from "@/models/roleModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserRole from "@/models/userRole";
import { IUserRolePopulated } from "@/types/userRole";

const generateToken = (userId: string, roles: string[]): string => {
  return jwt.sign({ userId, roles }, process.env.JWT_SECRET!, {
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

    const newUser = new User({
      firstName,
      lastName,
      userName,
      email,
      password: passwordHash,
      phone,
    });
    await newUser.save();

    const defaultRole = await Role.findOne({ name: "customer" });
    if (!defaultRole) {
      return res.status(500).json({ message: "Default role not found" });
    }
    await UserRole.create({
      userId: newUser._id,
      roleId: defaultRole._id,
    });

    res.status(201).json({
      success: true,
      data: newUser,
      roles: [defaultRole.name],
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

    const userRoles = await UserRole.find({ userId: existEmail._id }).populate(
      "roleId"
    );
    const populatedRoles = userRoles as unknown as IUserRolePopulated[];
    const roleNames = populatedRoles.map((ur) => ur.roleId.name);

    const token = generateToken(existEmail._id, roleNames);

    return res.status(200).json({
      success: true,
      data: existEmail,
      roles: roleNames,
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
