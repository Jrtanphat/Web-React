import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e1e60] via-[#3a1c71] to-[#2a0845] px-4 pt-12 pb-12">
      {/* Tiêu đề chính */}
      <h1 className="text-4xl font-bold text-center text-white mb-8">
        Get in Touch with <span className="text-red-400">Mobile</span>
      </h1>

      {/* Khung contact */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-10 w-full max-w-6xl mx-auto text-white shadow-lg grid md:grid-cols-2 gap-10">
        {/* Left Side: Contact Info */}
        <div>
          <h2 className="text-3xl font-bold mb-4">Contact Info</h2>
          <p className="mb-6 text-sm text-gray-200">
            Have a question or need support? We're here to help you with your
            electronics journey.
          </p>
          <ul className="space-y-4 text-sm">
            <li>
              📍 <span className="font-semibold">Address:</span> 123 Tech Lane,
              Kolkata, India
            </li>
            <li>
              📧 <span className="font-semibold">Email:</span>{" "}
              support@zaptro.com
            </li>
            <li>
              📞 <span className="font-semibold">Phone:</span> +91 98765 43210
            </li>
          </ul>
        </div>

        {/* Right Side: Contact Form */}
        <form className="space-y-5">
          <div>
            <label className="block text-sm mb-1">Your Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full p-3 rounded-md bg-white text-black outline-none"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Email Address</label>
            <input
              type="email"
              placeholder="john@example.com"
              className="w-full p-3 rounded-md bg-white text-black outline-none"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Your Message</label>
            <textarea
              rows="4"
              placeholder="Type your message..."
              className="w-full p-3 rounded-md bg-white text-black outline-none resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-red-500 to-purple-600 text-white font-semibold rounded-md hover:opacity-90 transition-all"
          >
            Send Message 📩
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
