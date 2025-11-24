import Category from "@/models/categoryModel";
import { Request, Response } from "express";
export const createCategoryService = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const userId = req.user?.userId;
    const category = await Category.findOne({ name });
    if (category) {
      res.status(400).json({ message: "Category already exists" });
    }
    const newCategory = new Category({
      name,
      description,
      userId,
    });
    await newCategory.save();
    res.status(201).json({
      success: true,
      data: newCategory,
      message: "Category created successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
