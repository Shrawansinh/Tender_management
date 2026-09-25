import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Tenders = () => {
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

useEffect(() => {
    const fetchTender = async () => {
        try {
            // tumhara existing fetchTender ka code
        } catch (error) {
            console.error(error);
        }
    };

    fetchTender();
}, [id]);

  const filteredTenders = tenders.filter(
    (t) =>
      t.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.tenderNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl font-bold text-[#0A3D62] mb-6">
          Available Tenders
        </h1>

        {/* Search */}
        <input
          type="text"
          placeholder="Search tenders..."
          className="w-full mb-6 border p-3 rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {filteredTenders.map((tender) => (
              <div
                key={tender._id}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
              >
                <h2 className="text-xl font-bold text-[#0A3D62]">
                  {tender.title}
                </h2>

                <p className="text-sm text-gray-600 mt-2">
                  {tender.description}
                </p>

                <p className="mt-3 font-semibold">
                  Amount: ₹{tender.amount}
                </p>

                <p className="text-sm text-gray-500">
                  Last Date:{" "}
                  {new Date(tender.endDate).toLocaleDateString()}
                </p>

                {/* Bid Button */}
                <Link
                  to={`/bid/${tender._id}`}
                  className="block mt-4 bg-[#E67E22] text-white text-center py-2 rounded hover:bg-orange-600"
                >
                  Place Bid
                </Link>
              </div>
            ))}

            {filteredTenders.length === 0 && (
              <p>No Open Tenders Available</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tenders;