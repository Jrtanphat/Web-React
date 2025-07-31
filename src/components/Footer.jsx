import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPinterest,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#101829] text-white py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Info */}
        <div>
          <h2 className="text-2xl font-bold text-red-500 mb-2">Mobile</h2>
          <p className="mb-2 font-serif">
            Powering Your World with the Best in Electronics.
          </p>
          <p className="mb-2 font-serif">
            123 Electronics St, Style City, NY 10001
          </p>
          <p className="mb-2 font-serif">Email: support@mobile.com</p>
          <p className="mb-2 font-serif">Phone: (123) 456-7890</p>
        </div>
        {/* Customer Service */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Customer Service</h3>
          <ul className="space-y-2">
            <li>Contact Us</li>
            <li>Shipping &amp; Returns</li>
            <li>FAQs</li>
            <li>Order Tracking</li>
            <li>Size Guide</li>
          </ul>
        </div>
        {/* Social */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4 text-2xl">
            <FaFacebookF />
            <FaInstagram />
            <FaTwitter />
            <FaPinterest />
          </div>
        </div>
        {/* Subscribe */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Stay in the Loop</h3>
          <p className="mb-3 text-gray-300">
            Subscribe to get special offers, free giveaways, and more
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full p-2 rounded-l-md text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            <button
              type="submit"
              className="bg-red-500 text-white px-6 rounded-r-md font-semibold"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
