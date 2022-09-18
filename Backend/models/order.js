const momgoose = require('mongoose');
const {ObjectId} = mongoose.Schema;


const ProductCartSchema = new mongoose.Schema({
    product :{
        type : ObjectId,
        ref : 'Product'
    },
    name : {type : String} ,
    count : {type :Number},
    price : {}
})
const OrderSchema = new mongoose.Schema({
    products : [ProductCartSchema],
    transactionId : {},
    amount  : {type : Number},
    address : {type : String} ,
    updated : {type : Date} ,
    user : {
        type : ObjectId,
        ref : "User"
    }
},{timestamp : true}
);

const Order = mongoose.model ("Order",OrderSchema);
const ProductCart = mongoose.model("ProductCart",ProductCartSchema);
module.exports = {Order,ProductCart};