const Item = require("../../models/Item");
const Wishlist = require("../../models/Wishlist");

// ✅ 1. Get User's Wishlist
exports.getWishlist = async (req, res) => {
  try {
    const userId = req.user._id;

    const wishlist = await Wishlist.findOne({ user: userId }).populate("items.item", "name price image");

    if (!wishlist) {
      return res.status(200).json({ success: true, message: "[Wishlist] Wishlist is empty.", data: [] });
    }

    res.status(200).json({ success: true, message: "[Wishlist] Wishlist fetched successfully.", data: wishlist });

  } catch (error) {
    res.status(500).json({ success: false, message: `[Wishlist] ${error.message}`, data: null });
  }
};

// ✅ 2. Add Item to Wishlist
exports.addToWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const { itemId } = req.body;

    // Check if item exists
    const itemExists = await Item.findById(itemId);
    if (!itemExists) {
      return res.status(404).json({ success: false, message: "[Wishlist] Item not found.", data: null });
    }

    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      // Create new wishlist if it doesn't exist
      wishlist = new Wishlist({ user: userId, items: [{ item: itemId }] });
    } else {
      // Check if the item is already in the wishlist
      const alreadyInWishlist = wishlist.items.some((wishItem) => wishItem.item.toString() === itemId);
      if (alreadyInWishlist) {
        return res.status(400).json({ success: false, message: "[Wishlist] Item already in wishlist.", data: null });
      }

      wishlist.items.push({ item: itemId });
    }

    await wishlist.save();

    res.status(201).json({ success: true, message: "[Wishlist] Item added to wishlist successfully.", data: wishlist });

  } catch (error) {
    res.status(500).json({ success: false, message: `[Wishlist] ${error.message}`, data: null });
  }
};

// ✅ 3. Remove Item from Wishlist
exports.removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const { itemId } = req.body;

    const wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      return res.status(404).json({ success: false, message: "[Wishlist] Wishlist not found.", data: null });
    }

    const initialLength = wishlist.items.length;
    wishlist.items = wishlist.items.filter((wishItem) => wishItem.item.toString() !== itemId);

    if (wishlist.items.length === initialLength) {
      return res.status(404).json({ success: false, message: "[Wishlist] Item not found in wishlist.", data: null });
    }

    await wishlist.save();

    res.status(200).json({ success: true, message: "[Wishlist] Item removed from wishlist successfully.", data: wishlist });

  } catch (error) {
    res.status(500).json({ success: false, message: `[Wishlist] ${error.message}`, data: null });
  }
};

// ✅ 4. Clear Entire Wishlist
exports.clearWishlist = async (req, res) => {
  try {
    const userId = req.user._id;

    const wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      return res.status(404).json({ success: false, message: "[Wishlist] Wishlist not found.", data: null });
    }

    wishlist.items = [];
    await wishlist.save();

    res.status(200).json({ success: true, message: "[Wishlist] Wishlist cleared successfully.", data: null });

  } catch (error) {
    res.status(500).json({ success: false, message: `[Wishlist] ${error.message}`, data: null });
  }
};
