import { Request, Response } from "express";
import User from "@/models/userModel";
import Role from "@/models/roleModel";
import UserRole from "@/models/userRole";
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
      roles: [defaultRole.name],
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllUsersService = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = req.query.search as string;

    const query: any = {};
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { userName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    let user;
    if (search) {
      user = await User.find(query)
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        data: user,
        meta: {
          page: 1,
          limit: user.length,
          totalUser: user.length,
          totalPage: 1,
        },
      });
      return;
    }
    user = await User.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });
    const totalUser = await User.countDocuments();
    const totalPage = Math.ceil(totalUser / limit);
    res.status(200).json({
      success: true,
      data: user,
      meta: {
        page,
        limit,
        totalUser,
        totalPage,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserByIdService = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      success: true,
      data: user,
      message: "User retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateUserService = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const { firstName, lastName, userName, email, phone } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.userName = userName || user.userName;
    user.email = email || user.email;
    user.phone = phone || user.phone;

    await user.save();

    res.status(200).json({
      success: true,
      data: user,
      message: "User updated successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteUserService = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await UserRole.deleteMany({ userId: user._id });

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
