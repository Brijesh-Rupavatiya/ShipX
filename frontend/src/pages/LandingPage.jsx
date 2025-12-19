import React, { useState, useRef } from "react";
import { contactAPI } from "../services/api";

const LandingPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    business_name: "",
    message: "",
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const contactRef = useRef(null);

  const scrollTo = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    if (file) data.append("file", file);

    try {
      const response = await contactAPI.create(data);
      setNotification({ type: "success", message: response.data.message });
      setFormData({
        name: "",
        email: "",
        phone: "",
        business_name: "",
        message: "",
      });
      setFile(null);
    } catch (error) {
      setNotification({ type: "error", message: "Submission failed" });
    } finally {
      setLoading(false);
      setTimeout(() => setNotification(null), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {notification && (
        <div
          className={`fixed top-4 right-4 z-[200] px-6 py-4 rounded-lg shadow-lg text-white ${
            notification.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {notification.message}
        </div>
      )}

      {/* Hero Section */}
      <section ref={homeRef} className="relative h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?ixlib=rb-4.0.3)",
          }}
        >
          {/* Navigation */}
          <nav className="relative z-[100] bg-transparent px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-indigo-600 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">S</span>
                </div>
                <span className="text-white text-xl font-bold">ShipX</span>
              </div>

              <div className="hidden md:flex space-x-8 text-white">
                <button
                  onClick={() => scrollTo(homeRef)}
                  className="hover:text-indigo-400"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollTo(aboutRef)}
                  className="hover:text-indigo-400"
                >
                  About
                </button>
                <button
                  onClick={() => scrollTo(servicesRef)}
                  className="hover:text-indigo-400"
                >
                  Services
                </button>
                <button
                  onClick={() => scrollTo(contactRef)}
                  className="hover:text-indigo-400"
                >
                  Contact
                </button>
              </div>

              <button
                className="md:hidden text-white z-[110]"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={
                      isMenuOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16M4 18h16"
                    }
                  />
                </svg>
              </button>
            </div>

            {/* Mobile Menu*/}
            <div
              className={`md:hidden absolute top-0 left-0 w-full bg-gray-900 transition-all duration-300 ease-in-out overflow-hidden z-[105] ${
                isMenuOpen
                  ? "max-h-screen opacity-100 py-20"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="flex flex-col items-center space-y-6 text-white text-xl">
                <button onClick={() => scrollTo(homeRef)}>Home</button>
                <button onClick={() => scrollTo(aboutRef)}>About</button>
                <button onClick={() => scrollTo(servicesRef)}>Services</button>
                <button onClick={() => scrollTo(contactRef)}>Contact</button>
              </div>
            </div>
          </nav>

          <div className="flex items-center justify-center h-full relative">
            {/* Logos */}
            <div className="absolute inset-0 pointer-events-none hidden lg:block">
              <div className="absolute top-[30%] left-[20%] bg-gray-800/80 backdrop-blur px-4 py-2 rounded-full flex items-center gap-2">
                <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center text-[8px] text-black font-bold">
                  T
                </div>
                <span className="text-white text-sm">Tata</span>
              </div>
              <div className="absolute top-[25%] right-[25%] bg-gray-800/80 backdrop-blur px-4 py-2 rounded-full flex items-center gap-2">
                <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center text-[8px] text-black font-bold">
                  H
                </div>
                <span className="text-white text-sm">Hero</span>
              </div>
              <div className="absolute bottom-[35%] left-[25%] bg-gray-800/80 backdrop-blur px-4 py-2 rounded-full flex items-center gap-2">
                <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center text-[8px] text-black font-bold">
                  L
                </div>
                <span className="text-white text-sm">Lego</span>
              </div>
              <div className="absolute top-[40%] right-[15%] bg-gray-800/80 backdrop-blur px-4 py-2 rounded-full flex items-center gap-2">
                <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center text-[8px] text-black font-bold">
                  M
                </div>
                <span className="text-white text-sm">Myntra</span>
              </div>
            </div>

            <div className="text-center text-white px-4">
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="text-sm">✓ Fast Delivery</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="text-sm">✓ Global Shipping</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="text-sm">✓ Real-time Tracking</span>
                </div>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                STAY AHEAD
                <br />
                IN SHIPPING AND LOGISTICS
              </h1>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <button
                  onClick={() => scrollTo(contactRef)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-semibold"
                >
                  Contact us →
                </button>
                <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-8 py-3 rounded-lg font-semibold">
                  Play video ▷
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Review */}
      <section
        ref={aboutRef}
        className="py-20 bg-gradient-to-b from-gray-900 to-indigo-900 text-white"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-4">
                What Do Our Clients Say
              </h2>
              <p className="text-gray-300 mb-8">
                Exceptional service and building lasting relationships.
              </p>
              <div className="flex gap-4">
                <button className="bg-indigo-600 px-6 py-2 rounded-lg">
                  Read More
                </button>
                <button
                  onClick={() => scrollTo(contactRef)}
                  className="border border-white/30 px-6 py-2 rounded-lg"
                >
                  Get Started
                </button>
              </div>
            </div>
            <div className="overflow-hidden">
              <div className="flex space-x-6 overflow-x-auto pb-6 custom-scrollbar snap-x">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="min-w-[100%] md:min-w-[400px] bg-white/10 backdrop-blur-sm p-8 rounded-lg snap-center"
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-indigo-600 rounded-full mr-4"></div>
                      <div>
                        <h4 className="font-semibold">John Anderson {i}</h4>
                        <p className="text-sm text-gray-300">
                          CEO, Global Trade Inc
                        </p>
                      </div>
                    </div>
                    <div className="flex mb-4 text-yellow-400">
                      {[...Array(5)].map((_, s) => (
                        <span key={s}>★</span>
                      ))}
                    </div>
                    <p className="text-gray-300 italic">
                      "ShipX has transformed our logistics operations. Their
                      real-time tracking and reliable delivery services have
                      significantly improved our customer satisfaction."
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section ref={servicesRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded text-xs font-bold">
                Tracking
              </span>
              <h2 className="text-4xl font-bold mt-4 mb-4">
                Unlock The Full Power
                <br />
                of ShipX Logistics
              </h2>
              <p className="text-gray-600 mb-8">
                Track shipments, monitor vehicles, and analyze data—all from one
                smart dashboard.
              </p>
              <button
                onClick={() => scrollTo(contactRef)}
                className="bg-indigo-600 text-white px-6 py-3 rounded-full font-bold"
              >
                Contact us →
              </button>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80"
                alt="Dashboard"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute bottom-6 left-6 bg-white/70 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/40">
                <p className="text-[10px] text-gray-500 font-bold mb-1">
                  ● Improved Supply Chain
                </p>
                <p className="text-xl font-bold text-gray-900">
                  25K <span className="text-green-500 text-xs ml-1">+50%</span>
                </p>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {["Fast Delivery", "Global Network", "Secure Handling"].map(
              (s, idx) => (
                <div
                  key={idx}
                  className="text-center p-8 bg-gray-50 rounded-lg hover:shadow-lg transition"
                >
                  <div className="w-16 h-16 bg-indigo-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-white rounded"></div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{s}</h3>
                  <p className="text-gray-600">
                    Efficient logistics solutions tailored for your business.
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Contact & Map */}
      <section
        ref={contactRef}
        className="py-20 bg-gradient-to-b from-indigo-900 to-gray-900 text-white"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-gray-800 rounded-lg overflow-hidden h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.1449!2d72.8311!3d21.1702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDEwJzEyLjciTiA3MsKwNDknNTIuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-8">Send Us A Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  name="name"
                  onChange={handleChange}
                  value={formData.name}
                  placeholder="Name *"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white"
                />
                <input
                  name="email"
                  type="email"
                  onChange={handleChange}
                  value={formData.email}
                  placeholder="Email *"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white"
                />
                <input
                  name="business_name"
                  onChange={handleChange}
                  value={formData.business_name}
                  placeholder="Business Name"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white"
                />
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-indigo-600 file:text-white"
                />
                <textarea
                  name="message"
                  onChange={handleChange}
                  value={formData.message}
                  placeholder="Message *"
                  required
                  rows="4"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white"
                ></textarea>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-500 py-3 rounded-lg font-bold"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-5 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-indigo-600 flex items-center justify-center rounded">
                <span className="text-white font-bold">S</span>
              </div>
              <span className="text-xl font-bold">ShipX</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-xs">
              Global logistics leaders providing real-time tracking and secure
              handling.
            </p>
            <div className="flex bg-white/5 rounded-lg overflow-hidden border border-white/10 max-w-xs">
              <input
                type="email"
                placeholder="Newsletter"
                className="bg-transparent px-3 py-2 text-sm outline-none w-full"
              />
              <button className="bg-indigo-600 px-4 py-2 text-sm font-bold">
                Join
              </button>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-4">Services</h4>
            <ul className="text-gray-400 space-y-2 text-sm">
              <li>Sea Freight</li>
              <li>Air Freight</li>
              <li>Warehousing</li>
              <li>Tracking</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="text-gray-400 space-y-2 text-sm">
              <li>
                <button onClick={() => scrollTo(homeRef)}>Home</button>
              </li>
              <li>
                <button onClick={() => scrollTo(aboutRef)}>About Us</button>
              </li>
              <li>Careers</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="text-gray-400 space-y-2 text-sm">
              <li>Help Center</li>
              <li>Privacy Policy</li>
              <li>Terms</li>
              <li>FAQ</li>
            </ul>
          </div>
        </div>
      </footer>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-scrollbar::-webkit-scrollbar { height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.05); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #4f46e5; border-radius: 10px; }
      `,
        }}
      />
    </div>
  );
};

export default LandingPage;
