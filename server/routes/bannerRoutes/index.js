const express = require("express");
const { upload } = require("../../cloudinary/cloudinary");
const { addBanner, getBanners, updateBanner, deleteBanner } = require("../../controllers/banners");
const { tokenVerification } = require("../../controllers/auth_user");

const router = express.Router();

// ❌❌❌ needs to review this 
router.post("/banners/add", tokenVerification, upload.single("image"), addBanner); // Create a Banner (with Image Upload)
router.get("/banners/getall", getBanners); // Get All Banners (Optional: Filter by Active/Inactive)
router.put("/banners/edit/:bannerId", tokenVerification, upload.single("image"), updateBanner); // Update a Banner (Change Image, Title, Status, etc.)
router.delete("/banners/delete/:bannerId", tokenVerification, deleteBanner); // Delete a Banner

module.exports = router;

