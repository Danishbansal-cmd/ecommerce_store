const { uploadFile } = require("../../cloudinary/cloudinary");
const Product = require("../../models/Product");

const addProduct = async (req, res) => {
    try {
        const { name, image, price, saleprice, quantity, description, category, brand } = req.body;

        if (!name || !image || !price || !saleprice || !quantity || !description || !category || !brand) return res.json({
            success: false,
            data: null,
            message: '[Add Product] Some information missing'
        })

        //check if the product is already in database
        const findProductByName = await Product.findOne({ name });

        // if the product exist with same name
        if (findProductByName) return res.json({
            success: false,
            data: null,
            message: '[Add Product] Product with this name already exists'
        })

        // create new product and save in database
        const newProduct = await Product({ name, image, price, saleprice, quantity, description, category, brand }).save();

        //respond with success
        return res.json({ success: true, message: "[Add Product] Product added successfully", data: newProduct }).status(204);


    } catch (error) {
        return res.status(400).json({
            success: false,
            data: null,
            message: '[Add Product] Some Error Occured'
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;

        if (!productId) return res.json({
            success: false,
            data: null,
            message: '[Delete Product] ProductId is not given'
        })

        //check product id and delete
        const findProductByIdAndDelete = await Product.findOneAndDelete({ _id: productId });

        // if the product does not exist
        if (!findProductByIdAndDelete) return res.json({
            success: false,
            data: null,
            message: '[Delete Product] Product with this Id does not Exist'
        })

        //respond with success, if deleted successfully
        return res.json({ success: true, message: "[Delete Product] Product deleted successfully", data: findProductByIdAndDelete }).status(200);

    } catch (error) {
        return res.status(400).json({
            success: false,
            data: null,
            message: '[Delete Product] Some Error Occured'
        })
    }
}

const getSpecificProduct = async (req, res) => {
    try {
        const { productId } = req.params;

        if (!productId) return res.json({
            success: false,
            data: null,
            message: '[Get Specific Product] ProductId is not given'
        })

        //check if product is available
        const findProductById = await Product.findOne({ _id: productId });

        //if the product does not exist
        if (!findProductById) return res.json({
            success: false,
            data: null,
            message: '[Get Specific Product] Product with this Id does not Exist'
        })

        //respond with success, if retreived successfully
        return res.status(201).json({ success: true, message: "[Get Specific Product] Product retreived successfully", data: findProductById });

    } catch (error) {
        return res.status(400).json({
            success: false,
            data: null,
            message: '[Get Specific Product] Some Error Occured'
        })
    }
}

const getAllProduct = async (req, res) => {
    try {
        //get all products
        const findAllProducts = await Product.find();

        //if the product does not exist
        if (!findAllProducts) return res.json({
            success: false,
            data: null,
            message: '[Get All Product] No products! Please add some!'
        })

        //respond with success, if retreived successfully
        return res.status(201).json({ success: true, message: "[Get All Product] All Products retreived successfully", data: findAllProducts });

    } catch (error) {
        return res.status(400).json({
            success: false,
            data: null,
            message: '[Get All Product] Some Error Occured'
        })
    }
}

const updateProduct = async (req, res) => {
    try {
        const { name, image, price, saleprice, quantity, description, category, brand } = req.body;
        const { productId} = req.params;

        if (!name || !image || !price || !saleprice || !quantity || !description || !productId || !category || !brand) return res.json({
            success: false,
            data: null,
            message: '[Update Product] Some information missing'
        })

        //check if product is existed and update it
        const findProductByIdAndUpdate = await Product.findOneAndUpdate({ _id: productId }, {name, image, price, saleprice, quantity, description}, {new : true, runValidators : true});
        
        //if the product does not exist
        if (!findProductByIdAndUpdate) return res.json({
            success: false,
            data: null,
            message: '[Update Product] Product with this Id does not Exist'
        })

        //respond with success, if updated successfully
        return res.status(201).json({ success: true, message: "[Update Product] Product updated successfully", data: findProductByIdAndUpdate });

    } catch (error) {
        return res.status(400).json({
            success: false,
            data: null,
            message: '[Update Product] Some Error Occured'
        })
    }
}

const handleProductImageUpoad = async (req, res) => {
    try {
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const url = 'data:' + req.file.mimetype + ';base64,' + b64;
        const result = await uploadFile(url);

        console.log(result, 'result');

        return res.json({
            success: true,
            message: '[Upload image] Uploaded successfully',
            data: result
        }).status(200);
    } catch (error) {
        return res.json({
            success: false,
            message: '[Upload image] Some error occured',
            data: null
        }).status(400);
    }
}

module.exports = {addProduct, deleteProduct, updateProduct, getAllProduct, getSpecificProduct, handleProductImageUpoad}

