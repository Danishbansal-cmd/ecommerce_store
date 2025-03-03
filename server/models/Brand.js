const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: [
    {
      url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
        required: true,
      },
      type : {
        type: String,
        enum: ["logo", "other"],
        default: "other",
      },
    },
  ],
  showOnHomepage: {
    type: Boolean,
    default: false,
  },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Brand", brandSchema);
