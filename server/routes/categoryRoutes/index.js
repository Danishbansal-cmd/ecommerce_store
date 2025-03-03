const express = require("express");
const { createCategory, getCategories, updateCategory, deleteCategory } = require("../../controllers/category");
const { tokenVerification } = require("../../controllers/auth_user");
const { upload } = require("../../cloudinary/cloudinary");
const router = express.Router();

router.post("/category/add", tokenVerification, upload.single("image"), createCategory);
router.get("/category/getall", getCategories);
router.put("/category/edit/:categoryId", tokenVerification, updateCategory);
router.delete("/category/delete/:categoryId", tokenVerification, deleteCategory);

module.exports = router;
