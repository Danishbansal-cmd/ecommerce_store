const Order = require("../../models/Order");
const Item = require("../../models/Item");

// ✅ Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { user, items, paymentInfo, shippingAddress, estimatedDeliveryDate } = req.body;

    if (!user || !items || items.length === 0) {
      return res.status(400).json({ success: false, message: "[Order] User ID and items are required", data: null });
    }

    let totalAmount = 0;

    for (const orderItem of items) {
      const item = await Item.findById(orderItem.item);
      if (!item) {
        return res.status(404).json({ success: false, message: `[Order] Item not found: ${orderItem.item}`, data: null });
      }
      totalAmount += orderItem.quantity * item.price;
    }

    const newOrder = new Order({
      user,
      items,
      totalAmount,
      paymentInfo,
      shippingAddress,
      estimatedDeliveryDate: estimatedDeliveryDate || null,
    });

    await newOrder.save();

    res.status(201).json({ success: true, message: "[Order] Order created successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: `[Order] ${error.message}`, data: null });
  }
};

// ✅ Get all orders (Admin)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email").populate("items.item", "name price");
    res.status(200).json({ success: true, message: "[Order] Orders fetched successfully", orders });
  } catch (error) {
    res.status(500).json({ success: false, message: `[Order] ${error.message}`, data: null });
  }
};

// ✅ Get all orders Statuses Only (Admin)
exports.getAllOrdersStatuses = async (req, res) => {
  try {
    // Check if the user is an admin
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "[Order] Unauthorized access. Only admins can view order statuses.",
        data: null,
      });
    }

    // Proceed with fetching the order statuses if the user is an admin
      const orders = await Order.aggregate([
        {
          $group: {
            _id: "$orderStatus", // Group by orderStatus
            totalOrders: { $sum: 1 }, // Count the number of orders per status
          },
        },
        {
          $project: {
            _id: 0, // Remove _id from the final result
            orderStatus: "$_id", // Rename _id to orderStatus
            totalOrders: 1, // Include the totalOrders count
          },
        },
      ]);
    
    res.status(200).json({ success: true, message: "[Order] Orders fetched successfully", orders });
  } catch (error) {
    res.status(500).json({ success: false, message: `[Order] ${error.message}`, data: null });
  }
};

// ✅ Get orders for a specific user
exports.getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ user: userId }).populate("items.item", "name price");

    if (!orders.length) {
      return res.status(404).json({ success: false, message: "[Order] No orders found for this user", data: null });
    }

    res.status(200).json({ success: true, message: "[Order] Orders fetched successfully", orders });
  } catch (error) {
    res.status(500).json({ success: false, message: `[Order] ${error.message}`, data: null });
  }
};

// ✅ Get a single order by ID
exports.getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId).populate("user", "name email").populate("items.item", "name price");

    if (!order) {
      return res.status(404).json({ success: false, message: "[Order] Order not found", data: null });
    }

    res.status(200).json({ success: true, message: "[Order] Order fetched successfully", order });
  } catch (error) {
    res.status(500).json({ success: false, message: `[Order] ${error.message}`, data: null });
  }
};

// ✅ Update order status (Admin)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { orderStatus } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "[Order] Order not found", data: null });
    }

    order.orderStatus = orderStatus;
    if (orderStatus === "Shipped") {
      order.estimatedDeliveryDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000); // Example: 5 days from now
    }

    await order.save();
    res.status(200).json({ success: true, message: "[Order] Order status updated", order });
  } catch (error) {
    res.status(500).json({ success: false, message: `[Order] ${error.message}`, data: null });
  }
};

// ✅ Delete an order (Admin)
exports.deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findByIdAndDelete(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "[Order] Order not found", data: null });
    }

    res.status(200).json({ success: true, message: "[Order] Order deleted successfully", data: null });
  } catch (error) {
    res.status(500).json({ success: false, message: `[Order] ${error.message}`, data: null });
  }
};
