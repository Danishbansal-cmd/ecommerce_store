const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the user who wrote the review
      required: true,
    },
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item", // Reference to the reviewed item
      required: true,
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order", // Ensures user has placed an order for this item
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
    images: [
        {
          url: { type: String, required: true },
          public_id: { type: String, required: true },
        },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Prevent duplicate reviews from the same user for the same item
reviewSchema.index({ user: 1, item: 1 }, { unique: true });

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
