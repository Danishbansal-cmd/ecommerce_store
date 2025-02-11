const { default: mongoose } = require("mongoose");

const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Item name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be a positive number"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    customFieldValues: [
      {
        fieldName: { type: String, required: true }, // e.g., "Processor"
        value: { type: mongoose.Schema.Types.Mixed, required: true }, // Stores user input
      },
    ],
    stock: {
      type: Number,
      required: [true, "Stock count is required"],
      min: [0, "Stock cannot be negative"],
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        public_id: {
          type: String,
          required: true,
        },
      },
    ],
    brand: {
      type: String,
      required: [true, "Brand is required"],
    },
    ratings: {
      type: Number,
      default: 0,
    },
    reviews : {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'Review'
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);
