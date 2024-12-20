const mongoose = require('mongoose');


const user = new mongoose.Schema({
    username : {
        type : String,
        unique : true,
        required : true
    },
    email : {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String,
        required : true,
    },
    role : {
        type : String,
        default : 'user'
    },
    verified : {
        type : String,
        enum : ['verified','not_verified'],
        default : 'not_verified'
    }
})


module.exports = mongoose.model('User',user);