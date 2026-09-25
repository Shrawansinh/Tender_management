import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../services/Api";
const BidPage = () => {
  const { id } = useParams();

  const [bidAmount, setBidAmount] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post(`/tenders/bid/${id}`, {
        email,
        companyName,
        bidAmount,
      });

      toast.success("Bid Submitted Successfully ");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit bid");
    }
  };

  return (
    <>
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-[#0A3D62]">
          Place Your Bid
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Enter the email" value={email} onChange={(e)=>{
            setEmail(e.target.value) 
          }} className="w-full border p-3 rounded" required />
          <input
            type="text"
            placeholder="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="number"
            placeholder="Bid Amount"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            className="w-full border p-3 rounded"
            required
          />

          <button
            type="submit"
            className="w-full bg-[#0A3D62] text-white py-3 rounded hover:bg-[#1B4F7A]"
          >
            Submit Bid
          </button>
        </form>
        
      </div>

      
    </div>
    <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default BidPage;