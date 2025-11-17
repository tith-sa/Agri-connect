import { Request, Response } from "express";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

export const createUserService = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, userName, email, password, phone } = req.body;
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
      roles: ["farmer"],
    });
    await newUser.save();
    res.status(201).json({
      success: true,
      data: newUser,
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
