require("dotenv").config();
const express = require("express");
const app=express();
const path=require("path");
const cors = require("cors");
app.use(cors());
const connectdb=require("./config/db");
const tenderRoute=require("./routes/tenderRoutes");
const adminRoute=require("./routes/adminRoute");
const venderRoute=require("./routes/vendorsRoute");

app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
connectdb(); //
// app.get("/",function(req,res){
//     res.send("Helo Bapu!");
// });
app.get("/", (req, res) => {
    res.status(200).send("Backend is running successfully 🚀");
});
app.use("/api/tenders",tenderRoute); // thats the path for access the tenderRoutes
app.use("/api/admin",adminRoute);
app.use("/api/vendors",venderRoute);
console.log(adminRoute);
app.post("/test",(req,res)=>{
    console.log("hhh");
    res.send("ok");
})
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});