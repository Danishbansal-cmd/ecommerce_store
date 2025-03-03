const express = require("express");
const { createItem, getItems, updateItem, deleteItem } = require("../../controllers/items");
const { upload } = require("../../cloudinary/cloudinary");
const { tokenVerification } = require("../../controllers/auth_user");
const router = express.Router();

router.post("/item/add", tokenVerification, upload.array("images", 5), createItem); // Allow up to 5 images
router.get("/item/getall", tokenVerification, getItems);
router.put("/item/edit/:itemId", tokenVerification, updateItem);
router.delete("/item/delete/:itemId", tokenVerification, deleteItem);

module.exports = router;
