const express = require('express');
const { addProduct, getAllProduct, getSpecificProduct, deleteProduct, updateProduct, handleProductImageUpoad } = require('../../controllers/products');
const { upload } = require('../../cloudinary/cloudinary');
const router = express.Router();


router.post('/product/upload', upload.single('uploaded_file'), handleProductImageUpoad)
router.post('/product/add', addProduct)
router.get('/product/getall', getAllProduct)
router.get('/product/get/:productId', getSpecificProduct)
router.delete('/product/delete/:productId', deleteProduct)
router.put('/product/update/:productId', updateProduct)


module.exports = router;
