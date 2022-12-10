const mongoose = require('mongoose');
const crypto = require('crypto');
const { v1: uuidv1 } = require('uuid');
var userSchema = new mongoose.Schema({
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
    salt : String,
    encry_password : {
        type : String,
        require : true
    },


});


userSchema.virtual("password").set(function(password){
    this._password=password;
    this.salt=uuidv1();
    this.encry_password=this.securePassword(password);
})
.get(function(){
    return this._password;
})



userSchema.methods.securePassword=function(plainpassword){
        if(!plainpassword) return "";
        try{
            return crypto.createHmac('sha256',this.salt).update(plainpassword).digest("hex");
        }
        catch(err){
            return "";
        }
    }



userSchema.methods.authenticate=function(plainpassword){
        return this.securePassword(plainpassword)===this.encry_password;
    }



module.exports = mongoose.model("user",userSchema);