const mongoose = require("mongoose");

const LikesSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    productId: { type: String, required: true },
  },
  { timestamps: true }
);

LikesSchema.index({ userId: 1, productId: 1 }, { unique: true });

module.exports = mongoose.model("Likes", LikesSchema);
