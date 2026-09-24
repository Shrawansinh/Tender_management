const mongoose = require("mongoose");
const bidSchema= new mongoose.Schema({
    tenderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Tender"
    },
    email:{
        type:String,
        required:true,
    },
    companyName:{
        type:String,
        required:true
    },
    bidAmount:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:["Pending","Approved","Rejected"],
        default:"Pending"
    },
    fraudResult:{
      type:String,
      default:"Safe"
   }
},{timestamps:true});
module.exports=mongoose.model("Bid",bidSchema); // model name with scgeam name thats are parameters
// after this s-2 : we go to the controller section
// timestamps are use to cretae a 2 extra fields ok 
//createdAt   // Document kab create hua
// updatedAt   // Last time kab update hua