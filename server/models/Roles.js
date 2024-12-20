const mongoose = require('mongoose');


const role = new mongoose.Schema({
    role : {
        type : String,
        required : true
    },
    permissions : {
        type : [String],
        required : true,
    },
    description :{
        type : String,
        required : true,
    }
},{
    timestamps : true
});


module.exports = mongoose.model('Role', role);