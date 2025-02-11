const Cart = require("../../models/Cart");
const Item = require("../../models/Item");

// ✅ 1. Add Item to Cart
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id; // User from token

    const product = await Item.findById(productId);
    if (!product) {
      return res.json({ success: false, message: "[Cart] Product not found", data : null }).status(404);
    }

    let cart = await Cart.findOne({ user: userId });

    // If cart doesn't exist, create a new one
    if (!cart) {
      cart = new Cart({ user: userId, items: [], totalAmount: 0 });
    }

    // Check if product already exists in the cart
    const existingItem = cart.items.find((item) => item.product.toString() === productId);

    if (existingItem) {
      existingItem.quantity += quantity; // Update quantity
    } else {
      cart.items.push({ product: productId, quantity, price: product.price });
    }

    // Recalculate total amount
    cart.totalAmount = cart.items.reduce((total, item) => total + item.quantity * item.price, 0);

    await cart.save();
    res.json({ success: true, message: "[Cart] Item added to cart", data: cart }).status(200);

  } catch (error) {
    res.json({ success: false, message: error.message }).status(500);
  }
};

// ✅ 2. Get User's Cart
exports.getCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId }).populate("items.product", "name price image");

    if (!cart) {
      return res.json({ success: true, message: "[Cart] Cart is empty", data: { items: [], totalAmount: 0 } }).status(200);
    }

    res.json({ success: true, message : "[Cart] Cart items retrieved successfully", data: cart }).status(200);

  } catch (error) {
    res.json({ success: false, message: error.message }).status(500);
  }
};

// ✅ 3. Update Item Quantity in Cart
exports.updateCartItem = async (req, res) => {
    try {
      const { productId, action, quantity } = req.body; 
      const userId = req.user._id;
  
      const cart = await Cart.findOne({ user: userId });
      if (!cart) {
        return res.status(404).json({ success: false, message: "[Cart] Cart not found", data: null });
      }
  
      const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);
      if (itemIndex === -1) {
        return res.status(404).json({ success: false, message: "[Cart] Item not found in cart", data: null });
      }
  
      // Handle Increment, Decrement, or Direct Input
      if (action === "increment") {
        cart.items[itemIndex].quantity += 1;  
      } else if (action === "decrement") {
        cart.items[itemIndex].quantity = Math.max(1, cart.items[itemIndex].quantity - 1); // Prevents going below 1
      } else if (typeof quantity === "number") {
        cart.items[itemIndex].quantity = Math.max(1, quantity); // Ensure it's always >= 1
      } else {
        return res.json({ success: false, message: "[Cart] Invalid action or quantity", data : null }).status(400);
      }
  
      // Recalculate total amount
      cart.totalAmount = cart.items.reduce((total, item) => total + item.quantity * item.price, 0);
  
      await cart.save();
      res.status(200).json({ success: true, message: "[Cart] Cart updated successfully", data: cart });
  
    } catch (error) {
      res.status(500).json({ success: false, message: `[Cart] ${error.message}`, data: null });
    }
  };

// ✅ 4. Remove Item from Cart
exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user._id;

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.json({ success: false, message: "[Cart] Cart not found", data : null }).status(404);
    }

    cart.items = cart.items.filter((item) => item.product.toString() !== productId);

    // Recalculate total amount
    cart.totalAmount = cart.items.reduce((total, item) => total + item.quantity * item.price, 0);

    await cart.save();
    res.json({ success: true, message: "[Cart] Item removed from cart", data: cart }).status(200);

  } catch (error) {
    res.json({ success: false, message: `[Cart] ${error.message}`, data : null }).status(500);
  }
};

// ✅ 5. Clear Cart
exports.clearCart = async (req, res) => {
  try {
    const userId = req.user._id;

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.json({ success: false, message: "[Cart] Cart not found", data : null }).status(404);
    }

    cart.items = [];
    cart.totalAmount = 0;

    await cart.save();
    res.json({ success: true, message: "[Cart] Cart cleared successfully", data : null }).status(200);

  } catch (error) {
    res.json({ success: false, message: `[Cart] ${error.message}`, data : null }).status(500);
  }
};

