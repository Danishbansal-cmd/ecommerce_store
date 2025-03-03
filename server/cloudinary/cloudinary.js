require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const multer = require('multer');

cloudinary.config({
    cloud_name: 'dbu3hvaba',
    api_key: '325931141576858',
    api_secret: 'Trnc-iWbo3h_rFH-E2OFJEktsqs'
});

const storage = new multer.memoryStorage();
const upload = multer({storage});

async function uploadFile(file) {
    try {
        const result = await cloudinary.uploader
            .upload(file, {
                resource_type: "auto",
                folder: process.env.CLOUDINARY_FOLDER
            });
        return result;
    } catch (error) {
        console.error('Error uploading file to Cloudinary:', error);
        throw error; // Re-throw the error to handle it in the calling function
    }
}


module.exports = {upload, uploadFile}