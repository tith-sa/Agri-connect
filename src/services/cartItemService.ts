import CartItem from "@/models/cartItemModel";
import Product from "@/models/productModel";
import { cartService } from "@/services/cartService";
import { ICartItem } from "@/types/cartItem";
import { Request, Response } from "express";

export const cartItemService = {
  addItem: async (req: Request, _res: Response) => {
    const userId = req.user?.userId;
    const { productId, quantity } = req.body;
    const cart = await cartService.getOrCreateCart(userId);

    const product = await Product.findById(productId);
    if (!product) throw new Error("Product not found");

    const existing = (await CartItem.findOne({
      cartId: cart._id,
      productId: product._id,
    })) as ICartItem;

    if (existing) {
      existing.quantity += quantity;
      existing.price = product.price * existing.quantity;
      await existing.save();
    } else {
      const price = product.price * quantity;
      await CartItem.create({
        cartId: cart._id,
        productId: product._id,
        quantity,
        price,
      });
    }

    await cartService.updateCartTotal(cart._id.toString());

    return await CartItem.findById(existing._id);
  },

  updateQuantity: async (req: Request, _res: Response) => {
    const itemId = req.params.itemId;
    const { quantity } = req.body;
    const item = (await CartItem.findById(itemId)) as ICartItem;
    if (!item) throw new Error("Cart item not found");

    item.quantity = quantity;
    const product = await Product.findById(item.productId);
    if (!product) throw new Error("Product not found");
    item.price = product.price * quantity;

    await item.save();

    await cartService.updateCartTotal(item.cartId.toString());

    return item;
  },

  removeItem: async (itemId: string) => {
    const item = (await CartItem.findById(itemId)) as ICartItem;
    if (!item) throw new Error("Cart item not found");

    await CartItem.findByIdAndDelete(itemId);

    await cartService.updateCartTotal(item.cartId.toString());
  },

  clearCart: async (userId: string) => {
    const cart = await cartService.getOrCreateCart(userId);
    await CartItem.deleteMany({ cartId: cart._id });
    await cartService.updateCartTotal(cart._id.toString());
  },
};
