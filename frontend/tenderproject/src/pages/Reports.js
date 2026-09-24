import { useNavigate } from "react-router-dom";

const Reports = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-indigo-100">
      
      <div className="bg-white shadow-xl rounded-2xl p-10 text-center max-w-md">
        
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Reports & Analytics
        </h1>

        <p className="text-gray-600 mb-6">
          Analytics dashboard is under development.
        </p>

        <div className="text-6xl mb-6 animate-pulse">📊</div>

        <h2 className="text-xl font-semibold text-indigo-600 mb-4">
          Coming Soon 🚀
        </h2>

        <button
          onClick={() => navigate("/dashboard")}
          className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Back to Dashboard
        </button>

      </div>

    </div>
  );
};

export default Reports;