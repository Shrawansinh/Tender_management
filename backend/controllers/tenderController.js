const Tender=require("../models/Tender"); // Tneder chhhe aapda mase so using this we can calculate
// this tender comes form the models 
const Bid = require("../models/Bid");
const axios = require("axios");
// tenderStats
const placeBid = async (req, res) => {
  try {
    const { email, companyName, bidAmount } = req.body;
    console.log(req.body);

    // Duplicate bid check
    const bid = await Bid.findOne({
      tenderId: req.params.id,
      email: email,
    });

    if (bid) {
      return res.status(400).json({
        message: "Bid already placed with this email",
      });
    }

    // Tender fetch
    const tender = await Tender.findById(req.params.id);

    if (!tender) {
      return res.status(404).json({
        message: "Tender not found",
      });
    }

    // AI Fraud Check
    const aiResponse = await axios.post(
      "http://localhost:5001/predict-fraud",
      {
        tenderPrice: Number(tender.amount),
        bidAmount: Number(bidAmount),
      }
    );

    const fraudResult = aiResponse.data.result;

    // Fraud hai to bid reject
    if (fraudResult === "Fraud") {
      return res.status(400).json({
        message: "Bid rejected! Bid amount is below 90% of the tender amount.",
      });
    }

    // Bid Save
    const venderCreate = await Bid.create({
      tenderId: req.params.id,
      email,
      companyName,
      bidAmount,
      fraudResult,
    });

    console.log(venderCreate);

    res.status(200).json(venderCreate);

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
const getAllVendors=async(req,res)=>{
  try{
    const vendors=await Bid.find().populate("tenderId");
    res.status(200).json({
      sucees:true,
      vendors
    });
  }catch(error){
    res.status(500).json(
      {message:error.message}
    )
  }
}
const getTenderStats=async(req,res)=>{
  try{
    // total tenders maxHeight: 
    const total= await Tender.countDocuments();
    const active = await Tender.countDocuments({status:"open"});
    const closed = await Tender.countDocuments({status:"closed"});
    res.status(200).json({
      totalTenders:total,
      activeTenders:active,
      closedTenders:closed,
    })
  }catch(error){
    res.status(500).json({
      error:error.message
    })
    console.log(error.message);
  }
}
// insert data 2.getall data 3.update data 4.deletedata
//1.addtender
const insertTender=async(req,res)=>{
  try{
    const tender=await Tender.create(req.body);
    res.status(200).json(tender);
  }
  catch(err){
    console.log(err);
    res.status(500).json({err:err.message});

  }
};
//2.getall tender
const getsTender=async(req,res)=>{
  try{
const tenders=await Tender.find();
res.status(200).json(tenders);
  }
  catch(err){
    res.status(500).json({err:err.message});
  }
}
//3.update using the id so find first then update
const updateTender=async(req,res)=>{
  try{
    const update=await Tender.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.status(200).json(update);
  }
  catch(err){
    res.status(500).json({err:err.message});
  }
}
//4.delete findByIdAndDelete
const deleteTender=async(req,res)=>{
  try{
    const deleteTender=await Tender.findByIdAndDelete(req.params.id);
    res.status(200).json({message:"delete done:"});

  }
  catch(err){
    res.status(500).json({err:err.message});
  }
};


module.exports={insertTender,getsTender,updateTender,deleteTender,getTenderStats,placeBid,getAllVendors};