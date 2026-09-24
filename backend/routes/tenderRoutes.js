// now we import the router from express its a third page for the databavse handling
const express=require("express");
const router=express.Router(); // minirouter create karyu like a small part of app
// import controllers
const {insertTender,updateTender,deleteTender,getsTender,getTenderStats,placeBid,getAllVendors} = require("../controllers/tenderController");
router.post("/add",insertTender);
router.get("/",getsTender);
router.put("/update/:id",updateTender);
router.delete("/delete/:id",deleteTender);
router.get("/stats",getTenderStats);
router.post("/bid/:id",placeBid);
router.get("/vendors",getAllVendors);
module.exports=router;