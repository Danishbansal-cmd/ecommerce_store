const mongoose = require('mongoose');

const Department = new mongoose.Schema({
    department : {
        type : String,
        required : true
    }
},{
    timestamps : true
})






module.exports = mongoose.model('Department',Department);
