import { Request, Response } from "express";
import Product from "@/models/productModel";

export const createProductService = async (req: Request, res: Response) => {
  try {
    const { name, description, price, stock, categoryId, topSeller } = req.body;
    const userId = req.user?.userId;

    if (stock <= 0 || price <= 0) {
      return res
        .status(400)
        .json({ message: "Stock and price must be greater than zero" });
    }

    const newProduct = new Product({
      name,
      description,
      price,
      stock,
      topSeller,
      userId,
      categoryId,
    });

    await newProduct.save();
    return res
      .status(201)
      .json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

export const getAllProductsService = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = req.query.search as string;
    const query: any = {};
    if (search) {
      query.$or = [{ name: { $regex: search, $options: "i" } }];
    }

    let products;
    if (search) {
      products = await Product.find(query)
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        data: products,
        meta: {
          page: 1,
          limit: products.length,
          totalProducts: products.length,
          totalPage: 1,
        },
      });
      return;
    }

    products = await Product.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });
    const totalProducts = await Product.countDocuments();
    const totalPage = Math.ceil(totalProducts / limit);
    res.status(200).json({
      success: true,
      message: "Products retrieved successfully",
      products,
      data: products,
      meta: {
        page,
        limit,
        totalProducts,
        totalPage,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

export const getUserProductsService = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = req.query.search as string;

    const query: any = { userId };

    if (search) {
      query.$or = [{ name: { $regex: search, $options: "i" } }];
    }

    const totalProducts = await Product.countDocuments(query);
    const totalPage = Math.ceil(totalProducts / limit);
    let products;
    if (search) {
      products = await Product.find(query)
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 });

      return res.status(200).json({
        success: true,
        data: products,
        meta: {
          page: 1,
          limit: products.length,
          totalProducts: products.length,
          totalPage: 1,
        },
      });
    }
    if (!search) {
      products = await Product.find(query)
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 });

      return res.status(200).json({
        success: true,
        message: "User products retrieved successfully",
        data: products,
        meta: {
          page,
          limit,
          totalProducts,
          totalPage,
        },
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error", error });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({
      success: true,
      message: "Product retrieved successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};
