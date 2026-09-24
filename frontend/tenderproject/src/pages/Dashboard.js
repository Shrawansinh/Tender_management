
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [stats] = useState({
    totalTenders: 24,
    activeVendors: 155,
    pendingApprovals: 8
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    // Add logout animation or confirmation if needed
    localStorage.removeItem("token");
    navigate("/");
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const menuItems = [
    {
      to: "/AddTender",
      title: "Add Tender",
      description: "Create new government tender",
      icon: "➕",
      color: "blue",
      borderColor: "border-blue-500",
      bgGradient: "from-blue-50 to-blue-100",
      hoverColor: "group-hover:bg-blue-600"
    },
    {
      to: "/ViewTender",
      title: "View Tenders",
      description: "See all active tenders",
      icon: "📋",
      color: "green",
      borderColor: "border-green-500",
      bgGradient: "from-green-50 to-green-100",
      hoverColor: "group-hover:bg-green-600"
    },
    {
      to: "/Managevendors",
      title: "Manage Vendors",
      description: "Approve or manage vendors",
      icon: "👥",
      color: "purple",
      borderColor: "border-purple-500",
      bgGradient: "from-purple-50 to-purple-100",
      hoverColor: "group-hover:bg-purple-600"
    },
    {
      to: "/Reports",
      title: "Reports",
      description: "View system analytics",
      icon: "📊",
      color: "indigo",
      borderColor: "border-indigo-500",
      bgGradient: "from-indigo-50 to-indigo-100",
      hoverColor: "group-hover:bg-indigo-600"
    }
  ];

  const quickActions = [
    // { name: "Recent Tenders", count: "12", icon: "📄", color: "bg-blue-500" },
    { name: "Active Vendors", count: stats.activeVendors, icon: "👤", color: "bg-green-500" },
    { name: "Pending", count: stats.pendingApprovals, icon: "⏳", color: "bg-yellow-500" },
    { name: "Completed", count: "45", icon: "✅", color: "bg-purple-500" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Modern Header with Glass Effect */}
      <header className="bg-gradient-to-r from-[#1e3c72] to-[#2a5298] text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                <span className="text-2xl">🏛️</span>
              </div>
              <div>
                <h1 className="font-bold text-2xl tracking-tight">Tender Management System</h1>
                <p className="text-sm text-blue-200">Admin Portal v2.0</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              {/* Date & Time Display */}
              <div className="hidden md:block text-right">
                <p className="text-sm text-blue-200">{formatDate(currentTime)}</p>
                <p className="text-lg font-semibold">{formatTime(currentTime)}</p>
              </div>
              
              {/* Logout Button with Icon */}
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-5 py-2 rounded-lg transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/30 group"
              >
                <span className="group-hover:translate-x-1 transition-transform duration-300">🚪</span>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section with Stats */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                Welcome back, Admin
                <span className="text-4xl animate-wave">👋</span>
              </h2>
              <p className="text-gray-600 mt-2">Here's what's happening with your tenders today</p>
            </div>
            
            {/* Quick Stats */}
            <div className="flex gap-4 mt-4 md:mt-0">
              {quickActions.map((action, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm px-4 py-2 flex items-center gap-3">
                  <div className={`${action.color} w-10 h-10 rounded-lg flex items-center justify-center text-white text-xl`}>
                    {action.icon}
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800">{action.count}</p>
                    <p className="text-xs text-gray-500">{action.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dashboard Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {menuItems.map((item, index) => (
            <Link to={item.to} key={index} className="group">
              <div className={`
                relative bg-white rounded-xl shadow-md hover:shadow-xl 
                transition-all duration-300 transform hover:-translate-y-2
                border-l-4 ${item.borderColor} overflow-hidden
              `}>
                {/* Background Gradient on Hover */}
                <div className={`
                  absolute inset-0 bg-gradient-to-br ${item.bgGradient} 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300
                `}></div>
                
                <div className="relative p-6">
                  {/* Icon with Circle Background */}
                  <div className={`
                    w-14 h-14 rounded-xl bg-gradient-to-br ${item.bgGradient} 
                    flex items-center justify-center text-3xl mb-4
                    group-hover:scale-110 transition-transform duration-300
                  `}>
                    {item.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-gray-900">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 group-hover:text-gray-700">
                    {item.description}
                  </p>
                  
                  {/* Animated Arrow */}
                  <div className="flex items-center text-sm font-medium text-gray-500 group-hover:text-gray-700">
                    <span>Access Dashboard</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" 
                         fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Coming Soon Section - Redesigned */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1e3c72] to-[#2a5298] text-white shadow-xl mb-8">
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative p-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center gap-6 mb-6 md:mb-0">
                <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
                  <span className="text-4xl animate-pulse">🚀</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Coming Soon Features</h3>
                  <p className="text-blue-100">We're working hard to bring you these exciting new features</p>
                </div>
              </div>
              
              {/* Feature Tags */}
              <div className="flex flex-wrap gap-3">
                <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                  ⚡ Bulk Import
                </span>
                <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                  📱 Mobile App
                </span>
                <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                  🤖 AI Analytics
                </span>
                <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                  🔔 Real-time Alerts
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-6">
              <div className="flex justify-between text-sm text-blue-200 mb-2">
                <span>Development Progress</span>
                <span>65%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div className="bg-white rounded-full h-2 w-2/3 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Feed or Additional Section */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Recent Activity
            </h4>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                    📄
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">New tender added</p>
                    <p className="text-xs text-gray-500">2 minutes ago</p>
                  </div>
                  <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">New</span>
                </div>
              ))}
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              System Status
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Server Status</span>
                <span className="text-green-600 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span>
                  Online
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Database</span>
                <span className="text-green-600">Connected</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">API Response Time</span>
                <span className="text-gray-800">124ms</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Active Users</span>
                <span className="text-gray-800">8</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center text-sm text-gray-600">
            <p>© 2024 Tender Management System. All rights reserved.</p>
            <div className="flex gap-6">
              <span className="hover:text-blue-600 cursor-pointer">Privacy Policy</span>
              <span className="hover:text-blue-600 cursor-pointer">Terms of Service</span>
              <span className="hover:text-blue-600 cursor-pointer">Help</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(20deg); }
          75% { transform: rotate(-15deg); }
        }
        .animate-wave {
          animation: wave 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;