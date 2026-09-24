const express = require("express");
const router = express.Router();
const {placeBid,getAllVendors,getTenderStats}=require("../controllers/tenderController");
const {updateBids,deleteBids,getDashboardStats}=require("../controllers/bidController");

router.put("/:id/status/",updateBids);
router.delete("/:id",deleteBids);
router.get("/dashboard-stats",getDashboardStats);
router.get("/",getAllVendors);
module.exports=router;