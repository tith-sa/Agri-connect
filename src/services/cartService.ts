import Cart from "@/models/cartModel";
import CartItem from "@/models/cartItemModel";

export const cartService = {
  getOrCreateCart: async (userId: string) => {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, total: 0 });
      await cart.save();
    }
    return cart;
  },

  updateCartTotal: async (cartId: string) => {
    const items = await CartItem.find({ cartId });
    const total = items.reduce((sum, item) => sum + item.price, 0);
    return await Cart.findByIdAndUpdate(cartId, { total }, { new: true });
  },

  getCartWithItems: async (userId: string) => {
    const cart = await Cart.findOne({ userId });
    if (!cart) return null;

    const items = await CartItem.find({ cartId: cart._id }).populate(
      "productId"
    );
    return { cart, items };
  },
};
