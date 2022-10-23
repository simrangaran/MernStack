const mongoose = require ('mongoose');
const CategorySchema = new mongoose.Schema({
    name : {
        type : String,
        trim : true,
        require : true,
        maxlength : 32,
        unique : true
    }
},
{timestamp : true}
);

module.export = mongoose.model("Category",CategorySchema);