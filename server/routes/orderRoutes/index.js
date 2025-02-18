const express = require("express");
const { tokenVerification } = require("../../controllers/auth_user");
const { createOrder, getAllOrders, getUserOrders, getOrderById, updateOrderStatus, deleteOrder, getAllOrdersStatuses } = require("../../controllers/orders");
const router = express.Router();

router.post("/order/add", tokenVerification, createOrder); // Create a new order (Authenticated User)
router.get("/order/getall", tokenVerification, getAllOrders); // Get all orders (Admin Only)
router.get("/order/status/getall", tokenVerification, getAllOrdersStatuses); // Get all orders (Admin Only)
router.get("/order/getall/user/:userId", tokenVerification, getUserOrders); // Get orders for a specific user (Authenticated User)
router.get("/order/get/:orderId", tokenVerification, getOrderById); // Get a single order by ID (Authenticated User)
router.put("/order/edit/:orderId/status", tokenVerification, updateOrderStatus); // Update order status (Admin Only)
router.delete("/order/delete/:orderId", tokenVerification, deleteOrder); // Delete an order (Admin Only)

module.exports = router;


