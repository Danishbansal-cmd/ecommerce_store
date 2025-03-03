const express = require('express');
const { tokenVerification, isAdmin } = require('../../controllers/auth_user');
const { upload } = require("../../cloudinary/cloudinary");
const { createBrand, getAllBrands, updateBrand, deleteBrand } = require('../../controllers/brand');
const router = express.Router();


router.post("/brand/add", tokenVerification, isAdmin, upload.single("image"), createBrand);
router.get("/brand/getall", getAllBrands);
// router.get("/brand/:id", getBrandById);
router.put("/brand/edit/:id", tokenVerification, isAdmin, updateBrand);
router.delete("/brand/delete/:id", tokenVerification, isAdmin, deleteBrand);

module.exports = router;
