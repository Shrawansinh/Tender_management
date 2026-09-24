const mongoose=require("mongoose");
// total 7 fields titile , description , number, amount, start date, end date
// here all are requiredLtrue and unique is true in nmber so dublictae value will be not includeded
const tenderSchema=new mongoose.Schema(
    {
        title:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
         tenderNumber:{
            type:String,
            required:true,
            unique:true
         },
         amount: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      default: "Open",
    },
},
{timestamps:true}
);
module.exports=mongoose.model("Tender",tenderSchema);
//route ma controller ni file add karvi to insert thay ne database ma 