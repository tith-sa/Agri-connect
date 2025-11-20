import { Request, Response } from "express";
import User from "@/models/userModel";
import Role from "@/models/roleModel";
import UserRole from "@/models/userRole";
import bcrypt from "bcryptjs";

export const createUserService = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, userName, email, password, phone } = req.body;
    const userId = req.user?.userId;
    const existUser = await User.findOne({ email }, { userName });
    if (existUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      userName,
      email,
      password: passwordHash,
      phone,
      createdBy: userId,
    });
    await newUser.save();

    const defaultRole = await Role.findOne({ name: "farmer" });
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
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
