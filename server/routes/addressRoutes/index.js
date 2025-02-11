const express = require('express');
const { tokenVerification } = require('../../controllers/auth_user');
const { addAddress, getAddresses, updateAddress, deleteAddress } = require('../../controllers/addresses');
const router = express.Router()

// 🔹 Create a New Address
router.post("/addresses/add", tokenVerification, addAddress);

// 🔹 Get All Addresses of a User
router.get("/addresses/getall", tokenVerification, getAddresses);

// 🔹 Update an Address
router.put("/addresses/edit/:addressId", tokenVerification, updateAddress);

// 🔹 Delete an Address
router.delete("/addresses/delete/:addressId", tokenVerification, deleteAddress);

module.exports = router;