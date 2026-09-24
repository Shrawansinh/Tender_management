import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/Api";

const ViewTenders = () => {
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [selectedTenders, setSelectedTenders] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [tenderToDelete, setTenderToDelete] = useState(null);

  useEffect(() => {
    fetchTenders();
  }, []);

  const fetchTenders = async () => {
    try {
      setLoading(true);
      const res = await api.get("/tenders");
      setTenders(res.data);
    } catch (error) {
      console.log("Error fetching tenders:", error);
      // Show error toast instead of alert
      showNotification("Error fetching tenders", "error");
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message, type = "success") => {
    // You can replace this with a proper toast notification library
    alert(message);
  };

  const handleDelete = async (id) => {
    setTenderToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/tenders/delete/${tenderToDelete}`);
      setTenders(tenders.filter(t => t._id !== tenderToDelete));
      setShowDeleteModal(false);
      setTenderToDelete(null);
      showNotification("Tender deleted successfully", "success");
    } catch (error) {
      console.log("Delete error:", error);
      showNotification("Error deleting tender", "error");
    }
  };

  const handleBulkDelete = async () => {
    if (selectedTenders.length === 0) return;
    
    if (!window.confirm(`Are you sure you want to delete ${selectedTenders.length} selected tenders?`)) return;
    
    try {
      // Assuming you have a bulk delete endpoint
      await Promise.all(selectedTenders.map(id => api.delete(`/delete/${id}`)));
      setTenders(tenders.filter(t => !selectedTenders.includes(t._id)));
      setSelectedTenders([]);
      showNotification(`${selectedTenders.length} tenders deleted successfully`, "success");
    } catch (error) {
      console.log("Bulk delete error:", error);
      showNotification("Error deleting tenders", "error");
    }
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleSelectAll = () => {
    if (selectedTenders.length === filteredAndSortedTenders.length) {
      setSelectedTenders([]);
    } else {
      setSelectedTenders(filteredAndSortedTenders.map(t => t._id));
    }
  };

  const handleSelectTender = (id) => {
    if (selectedTenders.includes(id)) {
      setSelectedTenders(selectedTenders.filter(tId => tId !== id));
    } else {
      setSelectedTenders([...selectedTenders, id]);
    }
  };

  // Filter and search logic
  const filteredAndSortedTenders = tenders
    .filter(tender => {
      const matchesSearch = 
        tender.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tender.tenderNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tender.description?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = filterStatus === 'all' || tender.status === filterStatus;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (!sortConfig.key) return 0;
      
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      
      if (sortConfig.key === 'amount') {
        return sortConfig.direction === 'asc' 
          ? parseFloat(aVal) - parseFloat(bVal)
          : parseFloat(bVal) - parseFloat(aVal);
      }
      
      if (sortConfig.key === 'startDate' || sortConfig.key === 'endDate') {
        return sortConfig.direction === 'asc'
          ? new Date(aVal) - new Date(bVal)
          : new Date(bVal) - new Date(aVal);
      }
      
      if (typeof aVal === 'string') {
        return sortConfig.direction === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      
      return 0;
    });

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'open': return 'bg-green-100 text-green-800 border-green-200';
      case 'closed': return 'bg-red-100 text-red-800 border-red-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch(status?.toLowerCase()) {
      case 'open': return '🟢';
      case 'closed': return '🔴';
      case 'pending': return '🟡';
      default: return '⚪';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const SortIcon = ({ column }) => {
    if (sortConfig.key !== column) return <span className="ml-1 text-gray-400">↕️</span>;
    return sortConfig.direction === 'asc' 
      ? <span className="ml-1 text-blue-600">↑</span>
      : <span className="ml-1 text-blue-600">↓</span>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0A3D62] to-[#1B4F7A]">
              Tender Management
            </h1>
            <p className="text-gray-600 mt-2">
              View and manage all your tenders in one place
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex gap-3">
            <Link
              to="/AddTender"
              className="bg-gradient-to-r from-[#0A3D62] to-[#1B4F7A] text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              <span className="text-xl">➕</span>
              <span>Add New Tender</span>
            </Link>
            
            {selectedTenders.length > 0 && (
              <button
                onClick={handleBulkDelete}
                className="bg-red-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
              >
                <span className="text-xl">🗑️</span>
                <span>Delete Selected ({selectedTenders.length})</span>
              </button>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
            <p className="text-sm text-gray-600 mb-1">Total Tenders</p>
            <p className="text-2xl font-bold text-[#0A3D62]">{tenders.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
            <p className="text-sm text-gray-600 mb-1">Open Tenders</p>
            <p className="text-2xl font-bold text-green-600">
              {tenders.filter(t => t.status?.toLowerCase() === 'open').length}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
            <p className="text-sm text-gray-600 mb-1">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">
              {tenders.filter(t => t.status?.toLowerCase() === 'pending').length}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
            <p className="text-sm text-gray-600 mb-1">Closed</p>
            <p className="text-2xl font-bold text-red-600">
              {tenders.filter(t => t.status?.toLowerCase() === 'closed').length}
            </p>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
              <input
                type="text"
                placeholder="Search by title, number, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-200 focus:border-[#E67E22] focus:ring-4 focus:ring-orange-100 p-3.5 pl-12 rounded-xl transition-all duration-300"
              />
            </div>
            
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">📊</span>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full border border-gray-200 focus:border-[#E67E22] focus:ring-4 focus:ring-orange-100 p-3.5 pl-12 rounded-xl appearance-none transition-all duration-300"
              >
                <option value="all">All Status</option>
                <option value="open">Open</option>
                <option value="closed">Closed</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilterStatus('all');
                }}
                className="flex-1 border border-gray-200 hover:bg-gray-50 px-4 py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>🔄</span>
                <span>Reset</span>
              </button>
              
              <button
                onClick={fetchTenders}
                className="bg-gray-100 hover:bg-gray-200 px-4 py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                title="Refresh"
              >
                <span className={`text-xl ${loading ? 'animate-spin' : ''}`}>⟳</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tenders Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin text-4xl mb-4">⏳</div>
              <p className="text-gray-600">Loading tenders...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-[#0A3D62] to-[#1B4F7A] text-white">
                  <tr>
                    <th className="p-4 w-12">
                      <input
                        type="checkbox"
                        checked={selectedTenders.length === filteredAndSortedTenders.length && filteredAndSortedTenders.length > 0}
                        onChange={handleSelectAll}
                        className="w-5 h-5 rounded border-white/20 bg-white/10 checked:bg-orange-500 focus:ring-orange-500 focus:ring-offset-0"
                      />
                    </th>
                    <th className="p-4 text-left cursor-pointer hover:bg-white/10 transition-colors" onClick={() => handleSort('title')}>
                      <div className="flex items-center">
                        Title <SortIcon column="title" />
                      </div>
                    </th>
                    <th className="p-4 text-left cursor-pointer hover:bg-white/10 transition-colors" onClick={() => handleSort('tenderNumber')}>
                      <div className="flex items-center">
                        Tender No. <SortIcon column="tenderNumber" />
                      </div>
                    </th>
                    <th className="p-4 text-left cursor-pointer hover:bg-white/10 transition-colors" onClick={() => handleSort('amount')}>
                      <div className="flex items-center">
                        Amount <SortIcon column="amount" />
                      </div>
                    </th>
                    <th className="p-4 text-left cursor-pointer hover:bg-white/10 transition-colors" onClick={() => handleSort('startDate')}>
                      <div className="flex items-center">
                        Start Date <SortIcon column="startDate" />
                      </div>
                    </th>
                    <th className="p-4 text-left cursor-pointer hover:bg-white/10 transition-colors" onClick={() => handleSort('endDate')}>
                      <div className="flex items-center">
                        End Date <SortIcon column="endDate" />
                      </div>
                    </th>
                    <th className="p-4 text-left cursor-pointer hover:bg-white/10 transition-colors" onClick={() => handleSort('status')}>
                      <div className="flex items-center">
                        Status <SortIcon column="status" />
                      </div>
                    </th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                
                <tbody className="divide-y divide-gray-100">
                  {filteredAndSortedTenders.length > 0 ? (
                    filteredAndSortedTenders.map((tender, index) => (
                      <tr 
                        key={tender._id} 
                        className={`hover:bg-gray-50 transition-colors group ${
                          selectedTenders.includes(tender._id) ? 'bg-blue-50/50' : ''
                        }`}
                      >
                        <td className="p-4 text-center">
                          <input
                            type="checkbox"
                            checked={selectedTenders.includes(tender._id)}
                            onChange={() => handleSelectTender(tender._id)}
                            className="w-5 h-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                          />
                        </td>
                        <td className="p-4">
                          <div>
                            <p className="font-medium text-gray-800">{tender.title}</p>
                            <p className="text-xs text-gray-500 mt-1 line-clamp-1">{tender.description}</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                            {tender.tenderNumber}
                          </span>
                        </td>
                        <td className="p-4 font-semibold text-gray-800">
                          {formatCurrency(tender.amount)}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-400">📅</span>
                            <span className="text-sm">{formatDate(tender.startDate)}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-400">📅</span>
                            <span className="text-sm">{formatDate(tender.endDate)}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(tender.status)}`}>
                            <span>{getStatusIcon(tender.status)}</span>
                            {tender.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center justify-center gap-2">
                            <Link
                              to={`/update/${tender._id}`}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-all duration-300 hover:shadow-md flex items-center gap-1 group-hover:scale-105"
                            >
                              <span>✏️</span>
                              <span>Edit</span>
                            </Link>
                            <button
                              onClick={() => handleDelete(tender._id)}
                              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-all duration-300 hover:shadow-md flex items-center gap-1 group-hover:scale-105"
                            >
                              <span>🗑️</span>
                              <span>Delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center py-20">
                        <div className="text-6xl mb-4">📭</div>
                        <p className="text-gray-500 text-lg mb-4">No tenders found</p>
                        <Link
                          to="/AddTender"
                          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0A3D62] to-[#1B4F7A] text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300"
                        >
                          <span>➕</span>
                          <span>Add Your First Tender</span>
                        </Link>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Table Footer */}
          {filteredAndSortedTenders.length > 0 && (
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Showing <span className="font-semibold">{filteredAndSortedTenders.length}</span> of{' '}
                  <span className="font-semibold">{tenders.length}</span> tenders
                </p>
                
                <div className="flex gap-2">
                  <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-100 transition-colors">
                    Previous
                  </button>
                  <button className="px-3 py-1 bg-[#0A3D62] text-white rounded-lg text-sm hover:bg-[#1B4F7A] transition-colors">
                    1
                  </button>
                  <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-100 transition-colors">
                    2
                  </button>
                  <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-100 transition-colors">
                    3
                  </button>
                  <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-100 transition-colors">
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-fadeIn">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">⚠️</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Confirm Delete</h3>
              <p className="text-gray-600">
                Are you sure you want to delete this tender? This action cannot be undone.
              </p>
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 rounded-xl font-semibold transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition-all duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ViewTenders;