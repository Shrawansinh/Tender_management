
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/Api";

const ManageVendors = () => {

  const navigate = useNavigate();

  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [stats, setStats] = useState({
    totalVendors: 0,
    totalBids: 0,
    lowestBid: 0
  });

  useEffect(() => {

    fetchVendors();
    fetchStats();

  }, []);

  // Fetch Vendors

  const fetchVendors = async () => {

    try {

      const res = await api.get("/vendors");

      setVendors(res.data.vendors);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  // Fetch Dashboard Stats

  const fetchStats = async () => {
  

    try {

      const res = await api.get("/vendors/dashboard-stats");
      console.log(res.data);

      setStats({
        totalVendors:res.data.totalVendors,
        totalBids:res.data.totalBids,
        lowestBid:res.data.lowestBid
      });

    } catch (error) {

      console.log(error);

    }

  };

  // Delete Vendor

  const handleDelete = async (id) => {

    try {

      await api.delete(`/vendors/${id}`);

      alert("Vendor Deleted Successfully");

      fetchVendors();
      fetchStats();

    } catch (error) {

      console.log(error);

    }

  };

  // Update Status

  const updateStatus = async (id, status) => {

    try {

      await api.put(`/vendors/${id}/status`, {
        status
      });

      fetchVendors();

    } catch (error) {

      console.log(error);

    }

  };

  // Search Vendors

  const filteredVendors = vendors.filter((vendor) =>
    vendor.companyName
      .toLowerCase()
      .includes(search.toLowerCase())
  );
console.log(stats);
  return (

    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold text-gray-800">
            Manage Vendors
          </h1>

          <p className="text-gray-600 mt-2">
            View and manage all vendor bids
          </p>

        </div>

        <button
          onClick={() => navigate("/dashboard")}
          className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 transition"
        >
          Back to Dashboard
        </button>

      </div>

      {/* Stats Cards */}

      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white rounded-2xl shadow p-6">

          <h2 className="text-gray-500 text-lg">
            Total Vendors
          </h2>

          <p className="text-4xl font-bold text-purple-600 mt-2">
            {stats.totalVendors}
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow p-6">

          <h2 className="text-gray-500 text-lg">
            Total Bids
          </h2>

          <p className="text-4xl font-bold text-blue-600 mt-2">
            {stats.totalBids}
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow p-6">

          <h2 className="text-gray-500 text-lg">
            Lowest Bid
          </h2>

          <p className="text-4xl font-bold text-green-600 mt-2">
            ₹{stats.lowestBid}
          </p>

        </div>

      </div>

      {/* Search */}

      <input
        type="text"
        placeholder="Search Vendor..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-4 rounded-xl border mb-8 outline-none"
      />

      {/* Loading */}

      {loading ? (

        <div className="flex justify-center items-center h-[60vh]">

          <h2 className="text-2xl font-semibold text-gray-600">
            Loading Vendors...
          </h2>

        </div>

      ) : filteredVendors?.length === 0 ? (

        <div className="bg-white rounded-2xl shadow p-10 text-center">

          <div className="text-6xl mb-4">
            📭
          </div>

          <h2 className="text-2xl font-bold text-gray-700 mb-2">
            No Vendors Found
          </h2>

          <p className="text-gray-500">
            No vendor has applied yet.
          </p>

        </div>

      ) : (

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {filteredVendors.map((vendor) => (

            <div
              key={vendor._id}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition"
            >

              {/* Header */}

              <div className="flex justify-between items-center mb-4">

                <h2 className="text-2xl font-bold text-gray-800">
                  {vendor.companyName}
                </h2>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium
                  ${
                    vendor.status === "Approved"
                      ? "bg-green-100 text-green-700"
                      : vendor.status === "Rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {vendor.status || "Pending"}
                </span>

              </div>

              {/* Vendor Details */}

              <div className="space-y-3">

                <p className="text-gray-700">
                  <span className="font-semibold">
                    Email:
                  </span>
                  {" "}
                  {vendor.email}
                </p>

                <p className="text-gray-700">
                  <span className="font-semibold">
                    Bid Amount:
                  </span>
                  {" "}
                  ₹{vendor.bidAmount}
                </p>

                <p className="text-gray-700">
                  <span className="font-semibold">
                    Tender:
                  </span>
                  {" "}
                  {vendor.tenderId?.title || "N/A"}
                </p>

                <p className="text-gray-700">
                  <span className="font-semibold">
                    Tender Number:
                  </span>
                  {" "}
                  {vendor.tenderId?.tenderNumber || "N/A"}
                </p>

                <p className="text-gray-700">
                  <span className="font-semibold">
                    Tender Amount:
                  </span>
                  {" "}
                  ₹{vendor.tenderId?.amount || "N/A"}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">
                    Fraud Check:
                  </span>
                  {" "}
                  <span className={
                    vendor.fraudResult === "Fraud"
                    ? "text-red-600 font-bold":
                    "text-green-600 font-bold"
                  } >
                    {vendor.fraudResult || "Safe"}

                  </span>
                </p>

                <p className="text-gray-500 text-sm">
                  Applied On:
                  {" "}
                  {new Date(vendor.createdAt).toLocaleDateString()}
                </p>

              </div>

              {/* Action Buttons */}

              <div className="flex flex-wrap gap-3 mt-6">

                <button
                  onClick={() =>
                    updateStatus(vendor._id, "Approved")
                  }
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  Approve
                </button>

                <button
                  onClick={() =>
                    updateStatus(vendor._id, "Rejected")
                  }
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                >
                  Reject
                </button>

                <button
                  onClick={() => handleDelete(vendor._id)}
                  className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );

};

export default ManageVendors;