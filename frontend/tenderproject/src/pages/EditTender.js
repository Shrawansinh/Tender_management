import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/Api";

const EditTender = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tenderNumber: "",
    amount: "",
    startDate: "",
    endDate: "",
    status: "Open",
  });

  useEffect(() => {
    fetchTender();
  }, []);

  const fetchTender = async () => {
    try {
      const res = await api.get(`/tenders/single/${id}`);
      setFormData({
        ...res.data,
        startDate: res.data.startDate?.split("T")[0],
        endDate: res.data.endDate?.split("T")[0],
      });
    } catch (error) {
      console.log("Error fetching tender:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/tenders/update/${id}`, formData);
      alert("Tender Updated Successfully ✅");
      navigate("/ViewTender");
    } catch (error) {
      console.log("Update error:", error);
      alert("Error updating tender ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex justify-center items-center p-6">
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="bg-white/90 backdrop-blur-sm shadow-2xl rounded-2xl w-full max-w-2xl p-10 border border-gray-100 relative transform transition-all duration-300 hover:shadow-3xl">
        {/* Header with decorative elements */}
        <div className="relative mb-8">
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full opacity-10"></div>
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 text-center tracking-wide">
            Update Tender Details
          </h2>
          <p className="text-center text-gray-500 text-sm mt-2">
            Modify the tender information below
          </p>
        </div>

        <form onSubmit={handleUpdate} className="space-y-6">
          {/* Tender Title Field */}
          <div className="group">
            <label className="block text-sm font-semibold mb-2 text-gray-700 group-focus-within:text-indigo-600 transition-colors duration-200">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
                Tender Title
              </span>
            </label>
            <input
              type="text"
              name="title"
              placeholder="e.g., Construction of Bridge"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 p-3.5 rounded-xl transition-all duration-200 bg-gray-50/50 hover:bg-white"
              required
            />
          </div>

          {/* Description Field */}
          <div className="group">
            <label className="block text-sm font-semibold mb-2 text-gray-700 group-focus-within:text-indigo-600 transition-colors duration-200">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                Description
              </span>
            </label>
            <textarea
              name="description"
              placeholder="Provide detailed description of the tender..."
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 p-3.5 rounded-xl transition-all duration-200 bg-gray-50/50 hover:bg-white resize-none"
              required
            />
          </div>

          {/* Tender Number Field */}
          <div className="group">
            <label className="block text-sm font-semibold mb-2 text-gray-700 group-focus-within:text-indigo-600 transition-colors duration-200">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                </svg>
                Tender Number
              </span>
            </label>
            <input
              type="text"
              name="tenderNumber"
              placeholder="e.g., TND-2024-001"
              value={formData.tenderNumber}
              onChange={handleChange}
              className="w-full border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 p-3.5 rounded-xl transition-all duration-200 bg-gray-50/50 hover:bg-white"
              required
            />
          </div>

          {/* Amount Field */}
          <div className="group">
            <label className="block text-sm font-semibold mb-2 text-gray-700 group-focus-within:text-indigo-600 transition-colors duration-200">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Amount (₹)
              </span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">₹</span>
              <input
                type="number"
                name="amount"
                placeholder="0.00"
                value={formData.amount}
                onChange={handleChange}
                className="w-full border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 p-3.5 pl-8 rounded-xl transition-all duration-200 bg-gray-50/50 hover:bg-white"
                required
              />
            </div>
          </div>

          {/* Date Fields Grid */}
          <div className="grid grid-cols-2 gap-5">
            <div className="group">
              <label className="block text-sm font-semibold mb-2 text-gray-700 group-focus-within:text-indigo-600 transition-colors duration-200">
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Start Date
                </span>
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 p-3.5 rounded-xl transition-all duration-200 bg-gray-50/50 hover:bg-white"
                required
              />
            </div>

            <div className="group">
              <label className="block text-sm font-semibold mb-2 text-gray-700 group-focus-within:text-indigo-600 transition-colors duration-200">
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  End Date
                </span>
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 p-3.5 rounded-xl transition-all duration-200 bg-gray-50/50 hover:bg-white"
                required
              />
            </div>
          </div>

          {/* Status Field */}
          <div className="group">
            <label className="block text-sm font-semibold mb-2 text-gray-700 group-focus-within:text-indigo-600 transition-colors duration-200">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Status
              </span>
            </label>
            <div className="relative">
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 p-3.5 rounded-xl transition-all duration-200 bg-gray-50/50 hover:bg-white appearance-none cursor-pointer"
              >
                <option value="Open" className="py-2">Open - Accepting Applications</option>
                <option value="Closed" className="py-2">Closed - Applications Closed</option>
              </select>
              <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 via-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-200 relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Update Tender
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-800 to-purple-800 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </button>
          </div>
        </form>

        {/* Footer note */}
        <p className="text-center text-xs text-gray-400 mt-6">
          * All fields are required. Please review before submitting.
        </p>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default EditTender;