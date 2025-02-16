const express = require("express");
const { tokenVerification } = require("../../controllers/auth_user");
const { getOrCreateProfile, updateProfile, addAddressToProfile, removeAddressFromProfile, addToWishlist, removeFromWishlist, addPaymentMethod, removePaymentMethod } = require("../../controllers/profile");
const router = express.Router();

router.get("/profile/getOrCreate", tokenVerification, getOrCreateProfile); // Get or create profile
router.put("/profile/edit", tokenVerification, updateProfile); // Update profile
router.post("/profile/add-address", tokenVerification, addAddressToProfile); // Add address
router.delete("/profile/remove-address", tokenVerification, removeAddressFromProfile); // Remove address
router.post("/profile/addTo-Wishlist", tokenVerification, addToWishlist); // Add to wishlist
router.delete("/profile/removeFrom-Wishlist", tokenVerification, removeFromWishlist); // Remove from wishlist
router.post("/profile/addTo-Payment", tokenVerification, addPaymentMethod); // Add payment method
router.delete("/profile/removeFrom-Payment", tokenVerification, removePaymentMethod); // Remove payment method

module.exports = router;
