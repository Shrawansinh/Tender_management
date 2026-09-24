import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/Api";
const AddTender = () => {
  const navigate = useNavigate();
  // now we create a state for our form ok ! 
  const [formData , setFormData]= useState({
    title:"",
    description : "",
    tenderNumber:"",
    amount:"",
    startDate:"",
    endDate:"",
    status:"open"
  });
  const handleChange=(e)=>{
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    });
  }
  // 
  const handleSubmit=async(e)=>{
    e.preventDefault(); // prevenDefault 
    try{
      await api.post("/tenders/add",formData); // this is used to send the daat to the server
      alert("Tender Added Sucessfully ");
      navigate("/Dashboard");
    }
    catch(error){
console.log("Error :",error);
alert("Error adding tender");
    }
  }

  return (
    <div className="min-h-screen bg-[#F4F6F7] flex justify-center items-center p-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-2xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-[#0A3D62] text-center">
          Add New Tender
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
{/* // accoring to a function we need a onChnage={} and a value field ok ! je admin bhare te value ma dekhay  */}
          <input
            type="text"
            name="title"
            placeholder="Tender Title"
            value={formData.title} // value will be store in the formData ok 
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <input
            type="text"
            name="tenderNumber"
            placeholder="Tender Number"
            value={formData.tenderNumber}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />

            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
          </div>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="open">open</option>
            <option value="closed">closed</option>
          </select>

          <button
            type="submit"
            className="w-full bg-[#E67E22] text-white py-2 rounded hover:bg-orange-600"
          >
            Add Tender
          </button>

        </form>
                <button
          onClick={() => navigate("/dashboard")}
          className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default AddTender;