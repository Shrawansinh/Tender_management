
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/Api';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [stats, setStats] = useState({
    activeTenders: 128,
    totalTenders: 342,
    closedTenders: 214
  });

  // Animated counter effect
  useEffect(()=>{
    fetchStats();
  },[]);
  const fetchStats=async()=>{
    try{
      const res=await api.get("/tenders/stats");
      setStats({
        totalTenders:res.data.totalTenders,
        activeTenders:res.data.activeTenders,
        closedTenders:res.data.closedTenders
      })
    }catch(error){
      console.log(error);
    }
  }
  const categories = [
    "All Categories",
    "Road Construction",
    "Building Infrastructure",
    "IT Services",
    "Healthcare",
    "Education",
    "Defense"
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search logic here
    console.log('Searching for:', searchTerm, 'in category:', selectedCategory);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Enhanced Header with Glass Morphism */}
      <header className="bg-gradient-to-r from-[#0A3D62] to-[#1B4F7A] text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-white/10 p-2 rounded-xl backdrop-blur-sm border border-white/20">
                <span className="text-2xl">🏛️</span>
              </div>
              <div>
                <h1 className="font-bold text-xl md:text-2xl tracking-tight">
                  Tender Management System
                </h1>
                <p className="text-xs text-blue-200 hidden md:block">
                  Government of India • E-Procurement Portal
                </p>
              </div>
            </div>
            
            {/* Navigation with Icons */}
            <nav className="flex items-center space-x-1 md:space-x-4">
              <Link to="/" className="px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-300 flex items-center gap-2">
                <span>🏠</span>
                <span className="hidden md:inline">Home</span>
              </Link>
              <Link to="/Tenders" className="px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-300 flex items-center gap-2">
                <span>📋</span>
                <span className="hidden md:inline">Tenders</span>
              </Link>
              <Link to="/Login" className="px-3 py-2 rounded-lg bg-[#E67E22] hover:bg-orange-600 transition-all duration-300 flex items-center gap-2 shadow-lg">
                <span>🔐</span>
                <span className="hidden md:inline">Admin Login</span>
              </Link>
              <Link to="/ContactUs" className="px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-300 flex items-center gap-2">
                <span>📞</span>
                <span className="hidden md:inline">Contact</span>
              </Link>
            </nav>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-gradient-to-r from-orange-400 to-orange-600 w-full"></div>
      </header>

      {/* Hero Section with Modern Design */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0A3D62] via-[#1B4F7A] to-[#2C3E50] text-white">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-orange-400 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm border border-white/20">
                🏆 Government of India • E-Procurement
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                <span className="text-orange-400">Digital Platform</span><br />
                for Transparent Tenders
              </h1>
              
              <p className="text-lg text-blue-100 leading-relaxed">
                A centralized digital platform to publish, manage and monitor government tenders 
                in a transparent and secure manner. Join thousands of vendors and government agencies.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                {/* <button className="group bg-[#E67E22] hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center gap-3">
                  <span>🔍 View Active Tenders</span>
                  <span className="group-hover:translate-x-2 transition-transform">→</span>
                </button> */}
                
                {/* <button className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/30 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3">
                  <span>📹 Watch Demo</span>
                  <span className="text-xl">▶</span>
                </button> */}
              </div>
              
              {/* Trust Indicators */}
              <div className="flex items-center gap-6 pt-6 text-sm text-blue-200">
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span>ISO Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span>SSL Secure</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
            
            {/* Right Content - Animated Icon */}
            <div className="relative text-center">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-orange-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                <div className="relative bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/20 animate-float">
                  <span className="text-8xl md:text-9xl block transform hover:scale-110 transition-transform duration-300">
                    🏢
                  </span>
                  <p className="mt-4 text-blue-200 font-medium">Government E-Procurement</p>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm animate-bounce">
                New Tenders Added
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path fill="#F4F6F7" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,170.7C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Stats Section with Enhanced Cards */}
      <section className="relative -mt-20 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Active Tenders Card */}
            <div className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative overflow-hidden rounded-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A3D62] to-[#1B4F7A] opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <div className="p-8 text-center">
                  <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    📋
                  </div>
                  <h3 className="text-4xl font-bold text-[#0A3D62] mb-2">{stats.activeTenders}</h3>
                  <p className="text-gray-600 font-medium">Active Tenders</p>
                  <div className="mt-4 text-sm text-green-600 flex items-center justify-center gap-1">
                    <span>↑</span>
                    <span>12% from last month</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Total Tenders Card */}
            <div className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative overflow-hidden rounded-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-[#E67E22] to-orange-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <div className="p-8 text-center">
                  <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    📊
                  </div>
                  <h3 className="text-4xl font-bold text-[#E67E22] mb-2">{stats.totalTenders}</h3>
                  <p className="text-gray-600 font-medium">Total Tenders</p>
                  <div className="mt-4 text-sm text-blue-600 flex items-center justify-center gap-1">
                    <span>📈</span>
                    <span>All time tenders</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Closed Tenders Card */}
            <div className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative overflow-hidden rounded-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <div className="p-8 text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    ✅
                  </div>
                  <h3 className="text-4xl font-bold text-green-600 mb-2">{stats.closedTenders}</h3>
                  <p className="text-gray-600 font-medium">Closed Tenders</p>
                  <div className="mt-4 text-sm text-gray-500 flex items-center justify-center gap-1">
                    <span>🏁</span>
                    <span>Successfully completed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section with Modern Design */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 border border-gray-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#0A3D62] mb-3">Search Tenders</h2>
              <p className="text-gray-600">Find the perfect tender opportunity for your business</p>
            </div>
            
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
                  <input
                    type="text"
                    placeholder="Search by tender title, number, or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full border border-gray-200 focus:border-[#E67E22] focus:ring-4 focus:ring-orange-100 p-4 pl-12 rounded-xl transition-all duration-300"
                  />
                </div>
                
                <div className="md:w-64 relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">📂</span>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full border border-gray-200 focus:border-[#E67E22] focus:ring-4 focus:ring-orange-100 p-4 pl-12 rounded-xl appearance-none transition-all duration-300"
                  >
                    {categories.map((category, index) => (
                      <option key={index} value={category}>{category}</option>
                    ))}
                  </select>
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">▼</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-[#E67E22] to-orange-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 group"
                >
                  <span>🔍 Search Tenders</span>
                  <span className="group-hover:translate-x-2 transition-transform">→</span>
                </button>
                
                <button
                  type="button"
                  className="px-8 py-4 border border-gray-200 rounded-xl font-semibold text-gray-600 hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <span>🗂️ Advanced Filters</span>
                </button>
              </div>
            </form>
            
            {/* Popular Searches */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-sm text-gray-500 mb-3">Popular Searches:</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-600 hover:bg-[#E67E22] hover:text-white cursor-pointer transition-all duration-300">Road Construction</span>
                <span className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-600 hover:bg-[#E67E22] hover:text-white cursor-pointer transition-all duration-300">IT Services</span>
                <span className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-600 hover:bg-[#E67E22] hover:text-white cursor-pointer transition-all duration-300">Healthcare</span>
                <span className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-600 hover:bg-[#E67E22] hover:text-white cursor-pointer transition-all duration-300">Education</span>
                <span className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-600 hover:bg-[#E67E22] hover:text-white cursor-pointer transition-all duration-300">Defense</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section (New) */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0A3D62] mb-4">Why Choose Our Platform?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide a transparent, efficient, and secure platform for government tenders
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: "🔒", title: "Secure", desc: "Bank-level security" },
              { icon: "⚡", title: "Fast", desc: "Real-time updates" },
              { icon: "🌍", title: "Transparent", desc: "Open bidding process" },
              { icon: "📱", title: "Accessible", desc: "Mobile friendly" }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-xl hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A3D62] text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🏛️</span>
                <h3 className="font-bold text-lg">TMS</h3>
              </div>
              <p className="text-sm text-blue-200">Government Tender Management System - Your trusted e-procurement platform.</p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-blue-200">
                <li><Link to="/" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/" className="hover:text-white transition-colors">How It Works</Link></li>
                <li><Link to="/" className="hover:text-white transition-colors">FAQs</Link></li>
                <li><Link to="/" className="hover:text-white transition-colors">Support</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-blue-200">
                <li><Link to="/" className="hover:text-white transition-colors">Terms of Use</Link></li>
                <li><Link to="/" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/" className="hover:text-white transition-colors">Cookie Policy</Link></li>
                <li><Link to="/" className="hover:text-white transition-colors">Grievance Redressal</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Contact Us</h4>
              <ul className="space-y-2 text-sm text-blue-200">
                <li>📞 +91 1234567890</li>
                <li>✉️ support@tms.gov.in</li>
                <li>📍 New Delhi, India</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm text-blue-200">
            <p>© 2024 Tender Management System. All rights reserved. | Government of India</p>
          </div>
        </div>
      </footer>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default Home;