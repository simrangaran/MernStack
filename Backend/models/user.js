const mongoose = require('mongoose');
var userSchema = new mongoose.Schame({
    name : {
        type : String,
        require : true,
        maxlength : 32,
        trim : true
    },
    lastName : {
        type : String,
        maxlength : 32,
        trim : 32
    },
    email : {
        type : String,
        trim : true,
        require : true,
        unique : true
    },
    userInfo : {
        type : String,
        trim : true
    },
    role : {
        type : Number,
        default : 0
    },
    purchase : {
        type : Array,
        default : []
    },
    encry_password : {
        type : String,
        require : true
    },


});

module.exports = mongoose.model("user",userSchema);