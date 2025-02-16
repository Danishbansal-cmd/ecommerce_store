const express = require("express");
const { createReview } = require("../../controllers/reviews");
const { tokenVerification } = require("../../controllers/auth_user");
const router = express.Router();

router.post("/review/add", tokenVerification, createReview); // Create a new review (Only if the user has purchased the item)
router.get("/review/getall/item/:itemId", reviewController.getItemReviews); // Get all reviews for a specific item
router.get("/review/getall/user", verifyUser, reviewController.getUserReviews); // Get all reviews written by a specific user (User can see their own reviews)
router.get("/review/getall", verifyAdmin, reviewController.getAllReviews); // Get all reviews (Admin Only)
router.put("/review/edit/:reviewId", verifyUser, reviewController.updateReview); // Update a review (User can update their own review)
router.delete("/review/delete/:reviewId", verifyUser, reviewController.deleteReview); // Delete a review (User can delete their own review)
router.delete("/review/delete/admin/:reviewId", verifyAdmin, reviewController.adminDeleteReview); // Delete any review (Admin Only)

module.exports = router;
