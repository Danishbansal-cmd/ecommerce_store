const mongoose = require('mongoose');

module.exports = mongoose.model('Product', new mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true
    },
    image : {
        type : String,
        required : true,
    },
    category : {
        type : String,
        required : true,
    },
    brand : {
        type : String,
        required : true,
    },
    price : {
        type : Number,
        required : true
    },
    saleprice : {
        type : Number,
        required : true
    },
    quantity : {
        type : Number,
        required : true
    },
    description : {
        type : String
    }
},{
    timestamps : true
})
);

