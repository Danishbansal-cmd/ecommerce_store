const express = require("express");
const { tokenVerification } = require("../../controllers/auth_user");
const { addToCart, getCart, updateCartItem, removeFromCart, clearCart } = require("../../controllers/cart");
const router = express.Router();

router.post("/cart/add", tokenVerification, addToCart); // Add item to cart
router.get("/cart/getall", tokenVerification, getCart); // Get cart details
router.put("/cart/edit", tokenVerification, updateCartItem); // Update item quantity
router.delete("/cart/remove-item", tokenVerification, removeFromCart); // Remove item from cart
router.put("/cart/delete", tokenVerification, clearCart); // Clear entire cart

module.exports = router;
