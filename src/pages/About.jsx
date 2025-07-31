import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="bg-gray-100 min-h-screen pt-10">
      <div className="bg-white max-w-4xl mx-auto p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-center mb-6">About Mobile</h1>

        <p className="text-center text-lg mb-8">
          Welcome to <span className="text-red-600 font-semibold">Mobile</span>,
          your one-stop destination for the latest and greatest in electronics.
          From cutting-edge gadgets to must-have accessories, we’re here to
          power up your tech life with premium products and unbeatable service.
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-red-700 mb-2">Our Mission</h2>
          <p>
            At Mobile, our mission is to make innovative technology accessible
            to everyone. We’re passionate about connecting people with the tools
            and tech they need to thrive in a digital world — all at competitive
            prices and delivered with speed and care.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="text-2xl font-bold text-red-700 mb-2">
            Why Choose Zaptro?
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Top-quality electronic products from trusted brands</li>
            <li>Lightning-fast and secure shipping</li>
            <li>Reliable customer support, always ready to help</li>
            <li>Easy returns and hassle-free shopping experience</li>
          </ul>
        </section>
        <div className="text-center mt-8">
          <Link
            to="/products"
            className="inline-block bg-red-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-red-700 transition duration-200"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
