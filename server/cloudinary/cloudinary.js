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
    const result = await cloudinary.uploader
        .upload(file, {
            resource_type: "auto"
        });
    return result;
}


module.exports = {upload, uploadFile}