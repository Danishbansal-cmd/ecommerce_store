const mongoose = require('mongoose');

const employee = mongoose.Schema({
    firstname : {
        type : String,
        required : true,
    },
    lastname : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    phonenumber : {
        type : Number,
        required : true
    },
    roleId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Role',
    },
    departmentId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Department'
    },
    status : { 
        type : String,
        enum : ['active', 'passive', 'on_leave'],
        default : 'active'
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
},{timestamps : true});

module.exports = mongoose.model('Employee', employee);

