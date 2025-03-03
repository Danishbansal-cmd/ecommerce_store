const Brand = require("../../models/Brand");

// @desc    Create a new brand
// @access  Admin
exports.createBrand = async (req, res) => {
  try {
    const { name, showOnHomepage } = req.body;

    // Check if image file is provided
    if (!req.file) {
      return res.status(400).json({ message: "[Brand] Image file is required" });
    }

    // Upload image to cloudinary
    let image;
    try {
      const base64 = Buffer.from(req.file.buffer).toString("base64");
      const url = `data:${req.file.mimetype};base64,${base64}`;
      const uploadResult = await uploadFile(url);

      image = {
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
      };
    } catch (error) {
        // Throw the error to be caught by outer catch  
        throw new Error(`[Brand] Image upload failed: ${error.message}`);
    }

    // Validate all required fields
    if (!name || !showOnHomepage) {
      return res.status(400).json({ message: "[Brand] Name and showOnHomepage are required" });
    }

    const newBrand = new Brand({ name, image, showOnHomepage });
    await newBrand.save();

    res.status(201).json({ 
      success: true, 
      message: "[Brand] Brand created successfully", 
      data: newBrand 
    });
  } catch (error) {
    res.status(500).json({ 
      message: `[Brand] Error in creating brand: ${error.message}`, 
      data: null 
    });
  }
};

// @desc    Get all brands
// @access  Public
exports.getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.find();
    res.status(200).json({ success: true, message: "[Brand] Brands retrieved successfully", data : brands });
  } catch (error) {
    res.status(500).json({ message: `[Brand] Error in getting all brands: ${error.message}`, data : null });
  }
};

// ❌❌❌ needs to review this 
// @desc    Get a single brand by ID
// @route   GET /api/brands/:id
// @access  Public
exports.getBrandById = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) return res.status(404).json({ message: "Brand not found" });

    res.status(200).json({ success: true, brand });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a brand
// @route   PUT /api/brands/:id
// @access  Admin
exports.updateBrand = async (req, res) => {
  try {
    const updatedBrand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedBrand) return res.status(404).json({ message: "Brand not found" });

    res.status(200).json({ success: true, brand: updatedBrand });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a brand
// @route   DELETE /api/brands/:id
// @access  Admin
exports.deleteBrand = async (req, res) => {
  try {
    const brand = await Brand.findByIdAndDelete(req.params.id);
    if (!brand) return res.status(404).json({ message: "Brand not found" });

    res.status(200).json({ success: true, message: "Brand deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
