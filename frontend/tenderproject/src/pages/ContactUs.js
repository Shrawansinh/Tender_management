import { useState } from 'react';
import { Link } from 'react-router-dom';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    message: '',
    agreeToTerms: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const departments = [
    'General Inquiry',
    'Technical Support',
    'Tender Related',
    'Vendor Registration',
    'Billing & Payment',
    'Complaint/Grievance',
    'Other'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitStatus('success');
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        department: '',
        message: '',
        agreeToTerms: false
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: "📍",
      title: "Head Office",
      details: ["Tender Management System", "5th Floor, Electronics Niketan", "New Delhi - 110001, India"],
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: "📞",
      title: "Phone Support",
      details: ["Toll Free: 1800-123-4567", "Landline: +91 11 2345 6789", "Monday - Friday, 9AM - 6PM"],
      color: "from-green-500 to-green-600"
    },
    {
      icon: "✉️",
      title: "Email",
      details: ["General: info@tms.gov.in", "Support: help@tms.gov.in", "Grievance: grievance@tms.gov.in"],
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: "🕒",
      title: "Working Hours",
      details: ["Monday - Friday: 9:00 AM - 6:00 PM", "Saturday: 10:00 AM - 2:00 PM", "Sunday: Closed"],
      color: "from-orange-500 to-orange-600"
    }
  ];

  const faqs = [
    {
      question: "How do I register as a vendor?",
      answer: "Visit our 'Manage Vendors' section after logging in as admin. You can add, approve, or manage vendor registrations from there."
    },
    {
      question: "What documents are required for tender application?",
      answer: "Typically you need GST certificate, PAN card, company registration proof, financial statements, and technical qualifications specific to the tender."
    },
    {
      question: "How can I track my tender application?",
      answer: "Login to your dashboard and navigate to 'My Applications' section to track the status of your submitted tenders."
    },
    {
      question: "Is there a mobile app available?",
      answer: "Yes, we're developing mobile apps for both Android and iOS. They will be available soon on respective app stores."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#0A3D62] to-[#1B4F7A] text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-3">
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
            </Link>
            
            <nav className="flex items-center space-x-1 md:space-x-4">
              <Link to="/" className="px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-300 flex items-center gap-2">
                <span>🏠</span>
                <span className="hidden md:inline">Home</span>
              </Link>
              <Link to="/tenders" className="px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-300 flex items-center gap-2">
                <span>📋</span>
                <span className="hidden md:inline">Tenders</span>
              </Link>
              <Link to="/Login" className="px-3 py-2 rounded-lg bg-[#E67E22] hover:bg-orange-600 transition-all duration-300 flex items-center gap-2 shadow-lg">
                <span>🔐</span>
                <span className="hidden md:inline">Admin Login</span>
              </Link>
              <Link to="/contact" className="px-3 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-300 flex items-center gap-2">
                <span>📞</span>
                <span className="hidden md:inline">Contact</span>
              </Link>
            </nav>
          </div>
        </div>
        <div className="h-1 bg-gradient-to-r from-orange-400 to-orange-600 w-full"></div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#0A3D62] to-[#1B4F7A] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Have questions about our tender management system? We're here to help!
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="max-w-7xl mx-auto px-6 -mt-10 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className={`p-6 rounded-t-2xl bg-gradient-to-r ${info.color}`}>
                <div className="text-4xl text-white mb-2">{info.icon}</div>
                <h3 className="text-lg font-bold text-white">{info.title}</h3>
              </div>
              <div className="p-6 space-y-2">
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-gray-600 text-sm">{detail}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
              <h2 className="text-3xl font-bold text-[#0A3D62] mb-2">Send us a Message</h2>
              <p className="text-gray-600 mb-8">We'll get back to you within 24 hours</p>

              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center gap-3">
                  <span className="text-2xl">✅</span>
                  <div>
                    <p className="font-semibold">Message sent successfully!</p>
                    <p className="text-sm">Our team will contact you soon.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-200 focus:border-[#E67E22] focus:ring-4 focus:ring-orange-100 p-3.5 rounded-xl transition-all duration-300"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-200 focus:border-[#E67E22] focus:ring-4 focus:ring-orange-100 p-3.5 rounded-xl transition-all duration-300"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full border border-gray-200 focus:border-[#E67E22] focus:ring-4 focus:ring-orange-100 p-3.5 rounded-xl transition-all duration-300"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Department <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-200 focus:border-[#E67E22] focus:ring-4 focus:ring-orange-100 p-3.5 rounded-xl transition-all duration-300 appearance-none"
                    >
                      <option value="">Select Department</option>
                      {departments.map((dept, index) => (
                        <option key={index} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full border border-gray-200 focus:border-[#E67E22] focus:ring-4 focus:ring-orange-100 p-3.5 rounded-xl transition-all duration-300 resize-none"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    required
                    className="mt-1 w-5 h-5 text-[#E67E22] border-gray-300 rounded focus:ring-[#E67E22]"
                  />
                  <label className="text-sm text-gray-600">
                    I agree to the <Link to="/terms" className="text-[#E67E22] hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-[#E67E22] hover:underline">Privacy Policy</Link>. I consent to having this website store my submitted information.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-gradient-to-r from-[#E67E22] to-orange-600 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 ${
                    isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin">⏳</span>
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <span>📨 Send Message</span>
                      <span>→</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Map & Additional Info */}
            <div className="space-y-6">
              {/* Map */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-80">
                <iframe
                  title="Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.361923153334!2d77.22067531507944!3d28.61298298242578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce2daa9eb4d2b%3A0x717971119923a5df!2sIndia%20Gate!5e0!3m2!1sen!2sin!4v1625123456789!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  className="hover:opacity-90 transition-opacity"
                ></iframe>
              </div>

              {/* Quick Support */}
              <div className="bg-gradient-to-r from-[#0A3D62] to-[#1B4F7A] rounded-2xl shadow-xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Need Quick Support?</h3>
                <p className="text-blue-100 mb-6">
                  Our support team is available 24/7 for emergency assistance
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">📞</span>
                    <div>
                      <p className="text-sm text-blue-200">Emergency Helpline</p>
                      <p className="font-bold">1800-123-4567 (Toll Free)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">💬</span>
                    <div>
                      <p className="text-sm text-blue-200">Live Chat</p>
                      <p className="font-bold">Available 9AM - 6PM</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">📧</span>
                    <div>
                      <p className="text-sm text-blue-200">Email Support</p>
                      <p className="font-bold">support@tms.gov.in</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0A3D62] mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">Find quick answers to common questions</p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group"
              >
                <details className="group">
                  <summary className="flex justify-between items-center font-semibold text-gray-800 cursor-pointer list-none">
                    <span>{faq.question}</span>
                    <span className="text-[#E67E22] group-open:rotate-180 transition-transform duration-300">▼</span>
                  </summary>
                  <p className="mt-4 text-gray-600 pl-4 border-l-4 border-[#E67E22]">
                    {faq.answer}
                  </p>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-[#0A3D62] to-[#1B4F7A]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-blue-200 mb-8">
            Subscribe to our newsletter for latest tender updates and announcements
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 rounded-xl border-0 focus:ring-4 focus:ring-orange-300 transition-all"
            />
            <button className="bg-[#E67E22] hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
              Subscribe
            </button>
          </form>
          <p className="text-xs text-blue-200 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
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
                <li><Link to="/faq" className="hover:text-white transition-colors">FAQs</Link></li>
                <li><Link to="/support" className="hover:text-white transition-colors">Support</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-blue-200">
                <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Use</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link></li>
                <li><Link to="/grievance" className="hover:text-white transition-colors">Grievance Redressal</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Connect With Us</h4>
              <div className="flex space-x-4 mb-4">
                <span className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 cursor-pointer transition-colors text-xl">📘</span>
                <span className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 cursor-pointer transition-colors text-xl">🐦</span>
                <span className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 cursor-pointer transition-colors text-xl">📷</span>
                <span className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 cursor-pointer transition-colors text-xl">🔗</span>
              </div>
              <p className="text-sm text-blue-200">
                Download our mobile app coming soon!
              </p>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm text-blue-200">
            <p>© 2024 Tender Management System. All rights reserved. | Government of India</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactUs;