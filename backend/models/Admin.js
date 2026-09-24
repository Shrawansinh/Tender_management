const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    }
},{
    timestamps:true
});
module.exports=mongoose.model("Admin",adminSchema);// 2 parameters model name and schema name
// after this we go to controller section that is s-2