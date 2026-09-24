const mongoose=require("mongoose");
const connectDb=async ()=>{
    try{
        console.log(process.env.MONGO_URL);
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Successfully connected");
    }catch(err){
        console.log("error ",err);
        process.exit(0);
    }
}
module.exports=connectDb;