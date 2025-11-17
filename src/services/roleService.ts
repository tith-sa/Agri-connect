import { Request, Response } from "express";
import Role from "@/models/roleModel";

export const createRoleService = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const userId = req.user?.userId;
    const existName = await Role.findOne({ name });
    if (existName) {
      return res.status(400).json({ message: "Role already exists" });
    }
    const newRole = new Role({
      name,
      userId,
    });
    await newRole.save();
    res.status(201).json({
      success: true,
      data: newRole,
      message: "Role created successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
