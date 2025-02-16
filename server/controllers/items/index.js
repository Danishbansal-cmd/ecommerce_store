const { uploadFile } = require("../../cloudinary/cloudinary");
const Category = require("../../models/Category");
const Item = require("../../models/Item");

// ✅ 1. Create an Item with Custom Fields Validation
exports.createItem = async (req, res) => {
  try {
    const { name, category, price, customFieldValues, stock, brand, description } = req.body;

    // Fetch the category with inherited custom fields
    const categoryData = await Category.findById(category);
    if (!categoryData) {
      return res.status(400).json({ success: false, message: "[Item] Invalid category", data: null });
    }

    // Validate provided custom fields
    for (const field of categoryData.inheritedCustomFields) {
      const providedField = customFieldValues.find(f => f.fieldName === field.fieldName);
      if (!providedField) {
        return res.status(400).json({ success: false, message: `[Item] Missing custom field: ${field.fieldName}`, data: null });
      }
      if (typeof providedField.value !== field.fieldType.toLowerCase()) {
        return res.status(400).json({ success: false, message: `[Item] Invalid type for ${field.fieldName}, expected ${field.fieldType}`, data: null });
      }
    }

    // ✅ Upload Images to Cloudinary
    let images = [];
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map(async (file) => {
        const b64 = Buffer.from(file.buffer).toString("base64");
        const url = `data:${file.mimetype};base64,${b64}`;
        const uploadResult = await uploadFile(url);
        return {
          url: uploadResult.secure_url,
          public_id: uploadResult.public_id,
        };
      });

      images = await Promise.all(uploadPromises);
    }

    // ✅ Save the item
    const newItem = new Item({
      name,
      category,
      price,
      customFieldValues,
      stock,
      brand,
      images, // Store uploaded images
      description,
    });

    await newItem.save();

    res.status(201).json({ success: true, message: "[Item] Item added successfully", data: newItem });

  } catch (error) {
    res.status(500).json({ success: false, message: `[Item] ${error.message}`, data: null });
  }
};

// ✅ 2. Get All Items
exports.getItems = async (req, res) => {
  try {
    const items = await Item.find().populate("category", "name");
    res.status(200).json({ success: true, message : "[Item] Items Retreived successfully", data: items });

  } catch (error) {
    res.status(500).json({ success: false, message: `[Item] ${error.message}`, data : null });
  }
};

// ✅ 3. Update an Item
exports.updateItem = async (req, res) => {
  try {
    const { name, price, customFieldValues, stock, brand, images, description } = req.body;
    const { itemId } = req.params;

    let item = await Item.findById(itemId);
    if (!item) return res.status(404).json({ success: false, message: "[Item] Item not found", data : null });

    // Update item details
    item.name = name || item.name;
    item.price = price || item.price;
    item.customFieldValues = customFieldValues || item.customFieldValues;
    item.stock = stock || item.stock;
    item.brand = brand || item.brand;
    item.images = images || item.images;
    item.description = description || item.description;

    await item.save();
    res.status(200).json({ success: true, message: "[Item] Item updated successfully", data: item });

  } catch (error) {
    res.status(500).json({ success: false, message: `[Item] ${error.message}`, data : null });
  }
};

// ✅ 4. Delete an Item
exports.deleteItem = async (req, res) => {
  try {
    const { itemId } = req.params;

    let item = await Item.findById(itemId);
    if (!item) return res.status(404).json({ success: false, message: "[Item] Item not found", data : null });

    await item.deleteOne();
    res.status(200).json({ success: true, message: "[Item] Item deleted successfully", data : null });

  } catch (error) {
    res.status(500).json({ success: false, message: `{item] ${error.message}`, data : null });
  }
};
