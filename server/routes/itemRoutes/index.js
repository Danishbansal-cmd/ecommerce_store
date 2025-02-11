const express = require("express");
const { createItem, getItems, updateItem, deleteItem } = require("../../controllers/manage_items");
const { tokenVerification } = require("../../controllers/auth_user");
const router = express.Router();

router.post("/item/add", tokenVerification, createItem);
router.get("/item/getall", tokenVerification, getItems);
router.put("/item/edit/:itemId", tokenVerification, updateItem);
router.delete("/item/delete/:itemId", tokenVerification, deleteItem);

module.exports = router;
