const Review = require("../../models/Review");
const Order = require("../../models/Order");

// ✅ 1. Create a new review (Only if user has purchased the item)
exports.createReview = async (req, res) => {
  try {
    const { itemId, orderId, rating, comment, images } = req.body;
    const userId = req.user._id;

    // Check if the user has purchased the item
    const order = await Order.findOne({ _id: orderId, user: userId, "items.item": itemId });

    if (!order) {
      return res.status(403).json({ success: false, message: "[Review] You can only review purchased items.", data: null });
    }

    // Create a new review
    const newReview = new Review({
      user: userId,
      item: itemId,
      order: orderId,
      rating,
      comment,
      images,
    });

    await newReview.save();

    res.status(201).json({ success: true, message: "[Review] Review added successfully.", data: newReview });

  } catch (error) {
    res.status(500).json({ success: false, message: `[Review] ${error.message}`, data: null });
  }
};

// ✅ 2. Get all reviews for a specific item
exports.getItemReviews = async (req, res) => {
  try {
    const { itemId } = req.params;
    
    const reviews = await Review.find({ item: itemId }).populate("user", "name email");

    res.status(200).json({ success: true, message: "[Review] Reviews fetched successfully.", data: reviews });

  } catch (error) {
    res.status(500).json({ success: false, message: `[Review] ${error.message}`, data: null });
  }
};

// ✅ 3. Get all reviews written by a specific user
exports.getUserReviews = async (req, res) => {
  try {
    const userId = req.user._id;

    const reviews = await Review.find({ user: userId }).populate("item", "name price");

    res.status(200).json({ success: true, message: "[Review] User reviews fetched successfully.", data: reviews });

  } catch (error) {
    res.status(500).json({ success: false, message: `[Review] ${error.message}`, data: null });
  }
};

// ✅ 4. Get all reviews (Admin Only)
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("user", "name email")
      .populate("item", "name");

    res.status(200).json({ success: true, message: "[Review] All reviews fetched successfully.", data: reviews });

  } catch (error) {
    res.status(500).json({ success: false, message: `[Review] ${error.message}`, data: null });
  }
};

// ✅ 5. Update a review (User can only update their own review)
exports.updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, comment, images } = req.body;
    const userId = req.user._id;

    const review = await Review.findOneAndUpdate(
      { _id: reviewId, user: userId },
      { rating, comment, images },
      { new: true }
    );

    if (!review) {
      return res.status(404).json({ success: false, message: "[Review] Review not found.", data: null });
    }

    res.status(200).json({ success: true, message: "[Review] Review updated successfully.", data: review });

  } catch (error) {
    res.status(500).json({ success: false, message: `[Review] ${error.message}`, data: null });
  }
};

// ✅ 6. Delete a review (User can delete their own review)
exports.deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user._id;

    const review = await Review.findOneAndDelete({ _id: reviewId, user: userId });

    if (!review) {
      return res.status(404).json({ success: false, message: "[Review] Review not found.", data: null });
    }

    res.status(200).json({ success: true, message: "[Review] Review deleted successfully.", data: null });

  } catch (error) {
    res.status(500).json({ success: false, message: `[Review] ${error.message}`, data: null });
  }
};

// ✅ 7. Delete any review (Admin Only)
exports.adminDeleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await Review.findByIdAndDelete(reviewId);

    if (!review) {
      return res.status(404).json({ success: false, message: "[Review] Review not found.", data: null });
    }

    res.status(200).json({ success: true, message: "[Review] Review deleted by admin.", data: null });

  } catch (error) {
    res.status(500).json({ success: false, message: `[Review] ${error.message}`, data: null });
  }
};
