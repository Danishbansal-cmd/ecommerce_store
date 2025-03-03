const { uploadFile } = require("../../cloudinary/cloudinary");
const Category = require("../../models/Category");

const computeInheritedFields = async (categoryId) => {
  let allCustomFields = [];
  let currentCategory = await Category.findById(categoryId).populate("parent");

  while (currentCategory?.parent) {
    const parentCategory = await Category.findById(currentCategory.parent);
    if (!parentCategory) break;

    allCustomFields = [...parentCategory.customFields, ...allCustomFields];
    currentCategory = parentCategory;
  }

  return allCustomFields;
};

// ❌❌❌ needs to review this 


// ✅ 1. Create a Category
exports.createCategory = async (req, res) => {
    try {
      const { name, parent, customFields, showOnHomepage } = req.body;
  
      // Compute inherited fields from parent categories
      let inheritedCustomFields = parent ? await computeInheritedFields(parent) : [];
  
      // Merge current category's fields with inherited fields
      inheritedCustomFields = [...inheritedCustomFields, ...customFields];

      // Upload image to cloudinary
      let image;
      if(req.file){
        try{
          const base64 = Buffer.from(req.file.buffer).toString("base64");
          const url = `data:${req.file.mimetype};base64,${base64}`;
          const uploadResult = await uploadFile(url);

          image = {
            url: uploadResult.secure_url,
            public_id: uploadResult.public_id,
          }
        }catch(error){
          // Throw the error to be caught by outer catch
          throw new Error(`Image upload failed: ${error.message}`);
        }
      }
  
      // Create new category
      const newCategory = new Category({ name, parent, customFields, inheritedCustomFields, image, showOnHomepage });
      await newCategory.save();
  
      res.status(201).json({ success: true, message: "[Category] Category created successfully", data: newCategory });
  
    } catch (error) {
      res.status(500).json({ success: false, message: `[Category] ${error.message}`, data : null });
    }
  };
  
  // ✅ 2. Get All Categories
  exports.getCategories = async (req, res) => {
    try {
      const categories = await Category.find().populate("parent", "name");
      res.status(200).json({ success: true, message : "[Category] Categories Retreived successfully", data: categories });
    } catch (error) {
      res.status(500).json({ success: false, message: `[Category] ${error.message}`, data : null });
    }
  };
  
  // ✅ 3. Update a Category
  exports.updateCategory = async (req, res) => {
    try {
      const { name, customFields } = req.body;
      const { categoryId } = req.params;
  
      let category = await Category.findById(categoryId);
      if (!category) return res.status(404).json({ success: false, message: "Category] Category not found", data : null });
  
      // Update category details
      category.name = name || category.name;
      category.customFields = customFields || category.customFields;
      category.inheritedCustomFields = await computeInheritedFields(category.parent);
  
      await category.save();
      res.status(200).json({ success: true, message: "[Category] Category updated successfully", data: category });
  
    } catch (error) {
      res.status(500).json({ success: false, message: `[Category] ${error.message}`, data : null });
    }
  };
  
  // ✅ 4. Delete a Category
  exports.deleteCategory = async (req, res) => {
    try {
      const { categoryId } = req.params;
  
      let category = await Category.findById(categoryId);
      if (!category) return res.status(404).json({ success: false, message: "[Category] Category not found", data : null });
  
      await category.deleteOne();
      res.status(200).json({ success: true, message: "[Category] Category deleted successfully", data : null });
  
    } catch (error) {
      res.status(500).json({ success: false, message: `[Category] ${error.message}`, data : null });
    }
  };