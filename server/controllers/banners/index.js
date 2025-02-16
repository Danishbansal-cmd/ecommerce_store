
const Banner = require("../../models/Banner");
const cloudinary = require("../config/cloudinary"); // Cloudinary Config (For Image Uploads)

// ✅ 1. Add a New Banner
// ❌❌❌ needs to review this 
exports.addBanner = async (req, res) => {
  try {
    const { title, description, bannerType, targetLink, isActive } = req.body;
    const file = req.file; // Image file uploaded

    if (!file) {
      return res.status(400).json({ success: false, message: "[Banner] Banner image is required", data : null });
    }

    // Upload image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(file.path, {
      folder: "banners",
    });

    // Create new banner
    const newBanner = new Banner({
      title,
      description,
      image: {
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
      },
      bannerType,
      targetLink,
      isActive,
    });

    await newBanner.save();
    res.status(201).json({ success: true, message: "[Banner] Banner added successfully", data: newBanner });

  } catch (error) {
    res.status(500).json({ success: false, message: `[Banner] ${error.message}`, data : null });
  }
};

// ✅ 2. Get All Banners (Filtered by Status)
exports.getBanners = async (req, res) => {
  try {
    const { isActive } = req.query;
    const query = isActive !== undefined ? { isActive } : {}; // Filter by active/inactive banners
    const banners = await Banner.find(query).sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: banners, message : "[Banner] Retrieved all Banners Successfully" });

  } catch (error) {
    res.status(500).json({ success: false, message: `[Banner] ${error.message}`, data : null });
  }
};

// ✅ 3. Update a Banner
// ❌❌❌ needs to review this 
exports.updateBanner = async (req, res) => {
  try {
    const { title, description, bannerType, targetLink, isActive } = req.body;
    const { bannerId } = req.params;
    const file = req.file; // New image file (if uploaded)

    let banner = await Banner.findById(bannerId);
    if (!banner) {
      return res.status(404).json({ success: false, message: "[Banner] Banner not found" });
    }

    // If a new image is uploaded, delete the old one and upload the new one
    if (file) {
      await cloudinary.uploader.destroy(banner.image.public_id); // Delete old image
      const uploadResult = await cloudinary.uploader.upload(file.path, { folder: "banners" });
      banner.image = { url: uploadResult.secure_url, public_id: uploadResult.public_id };
    }

    // Update banner details
    banner.title = title || banner.title;
    banner.description = description || banner.description;
    banner.bannerType = bannerType || banner.bannerType;
    banner.targetLink = targetLink || banner.targetLink;
    banner.isActive = isActive !== undefined ? isActive : banner.isActive;

    await banner.save();
    res.status(200).json({ success: true, message: "[Banner] Banner updated successfully", data: banner });

  } catch (error) {
    res.status(500).json({ success: false, message: `[Banner] ${error.message}`, data : null });
  }
};

// ✅ 4. Delete a Banner
exports.deleteBanner = async (req, res) => {
  try {
    const { bannerId } = req.params;

    const banner = await Banner.findById(bannerId);
    if (!banner) {
      return res.status(404).json({ success: false, message: "[Banner] Banner not found", data : null});
    }

    // Delete image from Cloudinary
    await cloudinary.uploader.destroy(banner.image.public_id);

    // Delete banner from database
    await banner.deleteOne();
    res.status(200).json({ success: true, message: "[Banner] Banner deleted successfully", data : null });
  } catch (error) {
    res.status(500).json({ success: false, message: `[Banner] ${error.message}`, data : null });
  }
};

