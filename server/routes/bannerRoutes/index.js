const express = require("express");

const { tokenVerification } = require("../../controllers/auth_user");

const router = express.Router();

// ✅ Create a Banner (with Image Upload)
// ❌❌❌ needs to review this 
router.post("/banners/add", tokenVerification, upload.single("image"), addBanner);

// ✅ Get All Banners (Optional: Filter by Active/Inactive)
router.get("/banners/getall", getBanners);

// ✅ Update a Banner (Change Image, Title, Status, etc.)
router.put("/banners/edit/:bannerId", tokenVerification, upload.single("image"), updateBanner);

// ✅ Delete a Banner
router.delete("/banners/delete/:bannerId", tokenVerification, deleteBanner);

module.exports = router;
