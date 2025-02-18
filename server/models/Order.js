const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to User model
      required: true,
    },
    items: [
      {
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Item", // Reference to Item model
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, "Quantity must be at least 1"],
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentInfo: {
      method: {
        type: String,
        enum: ["Credit Card", "Debit Card", "PayPal", "Cash on Delivery"],
        required: true,
      },
      status: {
        type: String,
        enum: ["Pending", "Completed", "Failed", "Refunded"],
        default: "Pending",
      },
      transactionId: {
        type: String, // For payment gateway transactions
        default: null,
      },
    },
    shippingAddress: {
      fullName: { type: String, required: true },
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      postalCode: { type: String, required: true },
      addressType: { type: String,enum: ["Home", "Office", "Billing", "Shipping"],default: "Home",},
    },
    orderStatus: {
      type: String,
      enum: ["Pending", "Delivered", "Confirmed", "Failed", "Refunded", "Our For Delivery", "Shipped", "Cancelled"],
      default: "Pending",
    },
    estimatedDeliveryDate: {
      type: Date,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);


