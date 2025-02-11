const Address = require("../../models/Address");

// ✅ 1. Add a New Address
exports.addAddress = async (req, res) => {
  try {
    const { street, city, state, country, postalCode, phoneNumber, addressType, isDefault } = req.body;
    const userId = req.user._id; // Assuming user is authenticated

    // If setting as default, update all other addresses to isDefault: false
    if (isDefault) {
      await Address.updateMany({ user: userId }, { isDefault: false });
    }

    // Create new address
    const newAddress = new Address({
      user: userId,
      street,
      city,
      state,
      country,
      postalCode,
      phoneNumber,
      addressType,
      isDefault,
    });

    await newAddress.save();
    res.json({ success: true, message: "[Address] Address added successfully", data: newAddress }).status(201);

  } catch (error) {
    res.status(500).json({ success: false, message: `[Address] ${error.message}`, data : null});
  }
};


// ✅ 2. Get All Addresses for a User
exports.getAddresses = async (req, res) => {
  try {
    const userId = req.user._id;
    const addresses = await Address.find({ user: userId }).sort({ isDefault: -1 });

    res.json({ success: true, message : "[Address] Retreived all addresses",data: addresses }).status(200);

  } catch (error) {
    res.json({ success: false, message: `[Address] ${error.message}`, data : null }).status(500);
  }
};


// ✅ 3. Update an Address
exports.updateAddress = async (req, res) => {
  try {
    const { street, city, state, country, postalCode, phoneNumber, addressType, isDefault } = req.body;
    const { addressId } = req.params;
    const userId = req.user._id;

    let address = await Address.findOne({ _id: addressId, user: userId });
    if (!address) {
      return res.json({ success: false, message: "[Address] Address not found", data : null }).status(404);
    }

    // If updating to default, set all other addresses to false
    if (isDefault) {
      await Address.updateMany({ user: userId }, { isDefault: false });
    }

    address.street = street || address.street;
    address.city = city || address.city;
    address.state = state || address.state;
    address.country = country || address.country;
    address.postalCode = postalCode || address.postalCode;
    address.phoneNumber = phoneNumber || address.phoneNumber;
    address.addressType = addressType || address.addressType;
    address.isDefault = isDefault !== undefined ? isDefault : address.isDefault;

    await address.save();
    res.json({ success: true, message: "[Address] Address updated successfully", data: address }).status(200);

  } catch (error) {
    res.status(500).json({ success: false, message: `[Address] ${error.message}`, data : null });
  }
};


// ✅ 4. Delete an Address
exports.deleteAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    const userId = req.user._id;

    const address = await Address.findOne({ _id: addressId, user: userId });
    if (!address) {
      return res.status(404).json({ success: false, message: "[Address] Address not found", data : null });
    }

    // Ensure there is at least one address remaining
    const addressCount = await Address.countDocuments({ user: userId });
    if (addressCount === 1) {
      return res.status(400).json({ success: false, message: "[Address] At least one address is required", data : null });
    }

    // If deleting the default address, set another as default
    if (address.isDefault) {
      await Address.findOneAndUpdate({ user: userId, _id: { $ne: addressId } }, { isDefault: true });
    }

    await Address.deleteOne({ _id: addressId });
    res.status(200).json({ success: true, message: "[Address] Address deleted successfully", data : null });

  } catch (error) {
    res.status(500).json({ success: false, message: `[Address] ${error.message}`, data : null });
  }
};
