const Category = require("../../models/Category");
const Item = require("../../models/Item");

// ❌❌❌ needs to review this 

// ✅ 1. Create an Item with Custom Fields Validation
exports.createItem = async (req, res) => {
  try {
    const { name, category, price, customFieldValues, stock, brand, images, description } = req.body;

    // Fetch the category with inherited custom fields
    const categoryData = await Category.findById(category);
    if (!categoryData) {
      return res.json({ success: false, message: "[Item] Invalid category", data : null }).status(400);
    }

    // Validate provided custom fields
    for (const field of categoryData.inheritedCustomFields) {
      const providedField = customFieldValues.find(f => f.fieldName === field.fieldName);

      if (!providedField) {
        return res.json({ success: false, message: `[Item] Missing custom field: ${field.fieldName}`, data : null }).status(400);
      }

      // Ensure correct data type
      if (typeof providedField.value !== field.fieldType.toLowerCase()) {
        return res.json({ success: false, message: `[Item] Invalid type for ${field.fieldName}, expected ${field.fieldType}`, data : null }).status(400);
      }
    }

    // Save the item
    const newItem = new Item({ name, category, price, customFieldValues, stock, brand, images, description });
    await newItem.save();

    res.json({ success: true, message: "[Item] Item added successfully", data: newItem }).status(201);

  } catch (error) {
    res.json({ success: false, message: `[Item] ${error.message}`, data : null }).status(500);
  }
};

// ✅ 2. Get All Items
exports.getItems = async (req, res) => {
  try {
    const items = await Item.find().populate("category", "name");
    res.json({ success: true, message : "[Item] Items Retreived successfully", data: items }).status(200);

  } catch (error) {
    res.json({ success: false, message: `[Item] ${error.message}`, data : null }).status(500);
  }
};

// ✅ 3. Update an Item
exports.updateItem = async (req, res) => {
  try {
    const { name, price, customFieldValues, stock, brand, images, description } = req.body;
    const { itemId } = req.params;

    let item = await Item.findById(itemId);
    if (!item) return res.json({ success: false, message: "[Item] Item not found", data : null }).status(404);

    // Update item details
    item.name = name || item.name;
    item.price = price || item.price;
    item.customFieldValues = customFieldValues || item.customFieldValues;
    item.stock = stock || item.stock;
    item.brand = brand || item.brand;
    item.images = images || item.images;
    item.description = description || item.description;

    await item.save();
    res.json({ success: true, message: "[Item] Item updated successfully", data: item }).status(200);

  } catch (error) {
    res.json({ success: false, message: `[Item] ${error.message}`, data : null }).status(500);
  }
};

// ✅ 4. Delete an Item
exports.deleteItem = async (req, res) => {
  try {
    const { itemId } = req.params;

    let item = await Item.findById(itemId);
    if (!item) return res.json({ success: false, message: "[Item] Item not found", data : null }).status(404);

    await item.deleteOne();
    res.json({ success: true, message: "[Item] Item deleted successfully", data : null }).status(200);

  } catch (error) {
    res.json({ success: false, message: `{item] ${error.message}`, data : null }).status(500);
  }
};
