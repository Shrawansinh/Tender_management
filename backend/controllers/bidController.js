const Bid = require("../models/Bid");
const Tender = require("../models/Tender");
const transporter = require("../config/mail");
const axios = require("axios");
const updateBids = async (req ,res)=>{
    try{
            console.log(process.env.EMAIL);
    console.log(process.env.EMAIL_PASSWORD);
    //console.log("UPDATE API HIT");
        const {status} = req.body;
        const bid = await Bid.findByIdAndUpdate(
            req.params.id,
            {status},
            {new:true}
        )
        // send email to vendor about status update
        await transporter.sendMail({
            from:process.env.EMAIL,
            to:bid.email,
            subject:"Bid Status Update",
            html:`
            <h2>Hello ${bid.companyName},</h2>
            <p>Your bid has been <b>${status}</b>.</p>
                    ${
          status === "Safe"
            ? "<p>Congratulations! Your bid is approved.</p>" : "<p>Sorry! Your bid is rejected.</p>"
        }
        <br/>
            <p>Thank you for participating in the tender process.</p>
            `
        }) 
        res.status(200).json({
            sucess:true,
            bid
        })

    }
    catch(error){
          console.log(error);
        res.status(500).json({
            message: error.message
        })
    }
}
// deleteVendors or bids same 
const deleteBids= async(req,res)=>{
    try{
        const deletedBid = await Bid.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success:true,
            message:"Bid deleted sucesfully",
            deletedBid
        })

    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}
// DASHBOARD STATS
const getDashboardStats=async(req,res)=>{
    try{
        // totalVendors
        // totalBids
        // lowestBids
        console.log("API HIT");
        const totalVendors = await Bid.countDocuments();
        const totalBids = await Bid.countDocuments();
        const lowestBidData = await Bid.findOne().sort({bidAmount:1}).select("bidAmount");
        console.log(lowestBidData);
        console.log(totalVendors,totalBids);
        res.status(200).json({
            success:true,
            totalVendors,
            totalBids,
            lowestBid:lowestBidData?.bidAmount ||0
        })

    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}
module.exports={updateBids,deleteBids,getDashboardStats};