const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
    },
    discount: {
      type: Number,
      min: 0,
      max: 100,
      default: 0, // Default discount is 0%
    },
    showOnHomepage: {
      type: Boolean,
      default: false,
    },
    image: {
      url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
        required: true,
      },
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null, // Top-level categories will have null parent
    },
    children: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    customFields: [
      {
        fieldName: { type: String, required: true }, // e.g., "Processor"
        fieldType: {type: String, enum: ["String", "Number", "Boolean"], required: true, // allowed types
        },
      },
    ],
    inheritedCustomFields: [
      {
        fieldName: { type: String, required: true },
        fieldType: { type: String, enum: ["String", "Number", "Boolean"], required: true }, 
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);

