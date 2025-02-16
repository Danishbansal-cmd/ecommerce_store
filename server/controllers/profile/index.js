const Profile = require("../../models/Profile");
const Address = require("../../models/Address");
const Item = require("../../models/Item");

// ✅ 1. Get or Create User Profile
exports.getOrCreateProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    let profile = await Profile.findOne({ user: userId })
      .populate("addresses", "fullName street city state country")
      .populate("wishlist", "name price image");

    if (!profile) {
      profile = new Profile({ user: userId });
      await profile.save();
    }

    res.status(200).json({ success: true, message: "[Profile] Profile fetched successfully.", data: profile });

  } catch (error) {
    res.status(500).json({ success: false, message: `[Profile] ${error.message}`, data: null });
  }
};

// ✅ 2. Update Profile Details
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const updateData = req.body;

    let profile = await Profile.findOneAndUpdate({ user: userId }, updateData, { new: true });

    if (!profile) {
      return res.status(404).json({ success: false, message: "[Profile] Profile not found.", data: null });
    }

    res.status(200).json({ success: true, message: "[Profile] Profile updated successfully.", data: profile });

  } catch (error) {
    res.status(500).json({ success: false, message: `[Profile] ${error.message}`, data: null });
  }
};

// ✅ 3. Add Address to Profile
exports.addAddressToProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { addressId } = req.body;

    const profile = await Profile.findOne({ user: userId });
    if (!profile) return res.status(404).json({ success: false, message: "[Profile] Profile not found.", data: null });

    const address = await Address.findById(addressId);
    if (!address) return res.status(404).json({ success: false, message: "[Profile] Address not found.", data: null });

    if (!profile.addresses.includes(addressId)) {
      profile.addresses.push(addressId);
      await profile.save();
    }

    res.status(200).json({ success: true, message: "[Profile] Address added to profile.", data: profile });

  } catch (error) {
    res.status(500).json({ success: false, message: `[Profile] ${error.message}`, data: null });
  }
};

// ✅ 4. Remove Address from Profile
exports.removeAddressFromProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { addressId } = req.body;

    const profile = await Profile.findOne({ user: userId });
    if (!profile) return res.status(404).json({ success: false, message: "[Profile] Profile not found.", data: null });

    profile.addresses = profile.addresses.filter(addr => addr.toString() !== addressId);
    await profile.save();

    res.status(200).json({ success: true, message: "[Profile] Address removed from profile.", data: profile });

  } catch (error) {
    res.status(500).json({ success: false, message: `[Profile] ${error.message}`, data: null });
  }
};

// ✅ 5. Add Item to Wishlist
exports.addToWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const { itemId } = req.body;

    const profile = await Profile.findOne({ user: userId });
    if (!profile) return res.status(404).json({ success: false, message: "[Profile] Profile not found.", data: null });

    const item = await Item.findById(itemId);
    if (!item) return res.status(404).json({ success: false, message: "[Profile] Item not found.", data: null });

    if (!profile.wishlist.includes(itemId)) {
      profile.wishlist.push(itemId);
      await profile.save();
    }

    res.status(200).json({ success: true, message: "[Profile] Item added to wishlist.", data: profile });

  } catch (error) {
    res.status(500).json({ success: false, message: `[Profile] ${error.message}`, data: null });
  }
};

// ✅ 6. Remove Item from Wishlist
exports.removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const { itemId } = req.body;

    const profile = await Profile.findOne({ user: userId });
    if (!profile) return res.status(404).json({ success: false, message: "[Profile] Profile not found.", data: null });

    profile.wishlist = profile.wishlist.filter(item => item.toString() !== itemId);
    await profile.save();

    res.status(200).json({ success: true, message: "[Profile] Item removed from wishlist.", data: profile });

  } catch (error) {
    res.status(500).json({ success: false, message: `[Profile] ${error.message}`, data: null });
  }
};

// ✅ 7. Add Payment Method
exports.addPaymentMethod = async (req, res) => {
  try {
    const userId = req.user._id;
    const { cardType, last4Digits, expiryDate } = req.body;

    const profile = await Profile.findOne({ user: userId });
    if (!profile) return res.status(404).json({ success: false, message: "[Profile] Profile not found.", data: null });

    profile.paymentMethods.push({ cardType, last4Digits, expiryDate });
    await profile.save();

    res.status(200).json({ success: true, message: "[Profile] Payment method added.", data: profile });

  } catch (error) {
    res.status(500).json({ success: false, message: `[Profile] ${error.message}`, data: null });
  }
};

// ✅ 8. Remove Payment Method
exports.removePaymentMethod = async (req, res) => {
  try {
    const userId = req.user._id;
    const { last4Digits } = req.body;

    const profile = await Profile.findOne({ user: userId });
    if (!profile) return res.status(404).json({ success: false, message: "[Profile] Profile not found.", data: null });

    profile.paymentMethods = profile.paymentMethods.filter(pm => pm.last4Digits !== last4Digits);
    await profile.save();

    res.status(200).json({ success: true, message: "[Profile] Payment method removed.", data: profile });

  } catch (error) {
    res.status(500).json({ success: false, message: `[Profile] ${error.message}`, data: null });
  }
};
