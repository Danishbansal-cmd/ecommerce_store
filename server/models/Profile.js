const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Links profile to a user
      required: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: [
        {
            type: String,
            required: true,
        }
    ],
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      default: "Other",
    },
    dateOfBirth: {
      type: Date,
    },
    profileImage: {
      url: { type: String, default: "" }, // Stores profile image URL
      public_id: { type: String, default: "" }, // For cloud storage reference
    },
    addresses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address", // Links to stored addresses
      },
    ],
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item", // Stores items users have added to their wishlist
      },
    ],
    paymentMethods: [
      {
        cardType: { type: String, enum: ["Credit Card", "Debit Card", "PayPal"] },
        last4Digits: { type: String }, // Stores only last 4 digits for security
        expiryDate: { type: String }, // e.g., "12/26"
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);

