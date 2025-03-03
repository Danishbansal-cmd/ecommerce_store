const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true, // Removes extra spaces
    },
    description: {
      type: String,
      default: "",
    },
    image: {
      url: { type: String, required: true }, // Cloud storage URL (e.g., Cloudinary, S3)
      public_id: { type: String, required: true }, // Unique ID for cloud storage
    },
    bannerType: {
      type: String,
      enum: ["Homepage", "Coupons","Category", "Product"],
      default: "Homepage",
      required : true
    },
    targetLink: {
      type: String,
      default: "#", // URL where the banner should redirect (product, category, etc.)
    },
    isActive: {
      type: Boolean,
      default: true, // Allows enabling/disabling banners
    },
    createdAt : {
        type : Date,
        default : Date.now(),
    }
  },
  { timestamps: true }
);

const Banner = mongoose.model("Banner", bannerSchema);

module.exports = Banner;
