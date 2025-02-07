const mongoose = require('mongoose')

module.exports = mongoose.Model('Coupon', mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    code : {
        type : String,
        required : true,
    },
    limitSameUser : {
        type : Number,
        required : true
    },
    startDate : {
        type : Date,
        required : true
    },
    endDate : {
        type : Date,
        required : true
    },
    discountType : {
        type : String,
        required : true
    },
    discount : {
        type : Number,
        required : true
    },
    minPurchase : {
        type : Number,
        required : true
    },
    status : {
        type : String,
        enum : ['active','passive'],
        default : 'active',
    }
}, {
    timestamps : true
}))