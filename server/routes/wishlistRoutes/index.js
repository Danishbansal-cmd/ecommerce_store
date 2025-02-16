const express = require("express");
const { tokenVerification } = require("../../controllers/auth_user");
const { getWishlist, clearWishlist } = require("../../controllers/wishlist");
const { addToWishlist, removeFromWishlist } = require("../../controllers/profile");
const router = express.Router();

router.get("/wishlist/item/getall", tokenVerification, getWishlist); // Get the user's wishlist
router.post("/wishlist/item/add", tokenVerification, addToWishlist); // Add an item to the wishlist
router.delete("/wishlist/item/delete", tokenVerification, removeFromWishlist); // Remove an item from the wishlist
router.delete("/wishlist/item/clear", tokenVerification, clearWishlist); // Clear the entire wishlist

module.exports = router;
