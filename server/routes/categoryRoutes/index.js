const express = require("express");
const { createCategory, getCategories, updateCategory, deleteCategory } = require("../../controllers/category");
const { tokenVerification } = require("../../controllers/auth_user");
const router = express.Router();

router.post("/category/add", tokenVerification, createCategory);
router.get("/category/getall", tokenVerification, getCategories);
router.put("/category/edit/:categoryId", tokenVerification, updateCategory);
router.delete("/category/delete/:categoryId", tokenVerification, deleteCategory);

module.exports = router;
