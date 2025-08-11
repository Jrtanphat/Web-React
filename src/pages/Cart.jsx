import React from "react";
import { useCart } from "../context/CartContext";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuNotebookText } from "react-icons/lu";
import { MdDeliveryDining } from "react-icons/md";
import { GiShoppingBag } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import emptyCart from "../assets/banner/empty-cart.png"; // Adjust the path as necessary

const Cart = () => {
  const { cartItem, updateQuantity, removeFromCart } = useCart();

  const navigate = useNavigate();

  const totalPrice = cartItem.reduce((total, item) => total + item.price, 0);
  return (
    <div className="mt-10 max-w-6xl mx-auto mb-5 px-4 md:px-0">
      {cartItem.length > 0 ? (
        <div>
          <h1 className="font-bold text-2xl">My Cart ({cartItem.length})</h1>
          <div>
            <div className="mt-10">
              {cartItem.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-5 rounded-md flex items-center justify-between mt-3 w-full"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-20 rounded-md"
                    />
                    <div>
                      <h1 className="md:w-[300px] line-clamp-2">
                        {item.title}
                      </h1>
                      <p className="text-red-500 font-semibold text-lg">
                        ${item.price}
                      </p>
                    </div>
                  </div>
                  <div className="bg-red-500 text-white flex gap-4 p-2 rounded-md font-bold text-xl">
                    <button
                      onClick={() =>
                        updateQuantity(cartItem, item.id, "decrease")
                      }
                      className="cursor-pointer"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(cartItem, item.id, "increase")
                      }
                      className="cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                  <span
                    onClick={() => removeFromCart(item.id)}
                    className="hover:bg-white/60 transition-all rounded-full p-3 hover:shadow-2xl"
                  >
                    <FaRegTrashAlt className="text-red-500 text-2xl cursor-pointer" />
                  </span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-20">
              <div className="bg-gray-100 rounded-md p-7 mt-4 space-y-2">
                <h1 className="text-gray-800 font-bold text-xl">
                  Delivery info
                </h1>
                <div className="flex flex-col space-y-1">
                  <label htmlFor="">Address</label>
                  <input
                    type="text"
                    placeholder="Enter your address"
                    className="p-2 rounded-md"
                    value={"123 Main St, New York, NY 10001"}
                  />
                </div>

                <div className="flex w-full gap-5">
                  <div className="flex flex-col space-y-1 w-full">
                    <label htmlFor="">FullName</label>
                    <input
                      type="text"
                      placeholder="Enter your FullName"
                      className="p-2 rounded-md w-full"
                      value={"John Doe"}
                    />
                  </div>
                  <div className="flex flex-col space-y-1 w-full">
                    <label htmlFor="">Phone Number</label>
                    <input
                      type="text"
                      placeholder="Enter your Phone Number"
                      className="p-2 rounded-md w-full"
                      value={"123-456-7890"}
                    />
                  </div>
                </div>

                <div className="flex w-full gap-5">
                  <div className="flex flex-col space-y-1 w-full">
                    <label htmlFor="">City</label>
                    <input
                      type="text"
                      placeholder="Enter your city"
                      className="p-2 rounded-md w-full"
                      value={"New York"}
                    />
                  </div>
                  <div className="flex flex-col space-y-1 w-full">
                    <label htmlFor="">District</label>
                    <input
                      type="text"
                      placeholder="Enter your district"
                      className="p-2 rounded-md w-full"
                      value={"Manhattan"}
                    />
                  </div>
                </div>

                <button className="bg-red-500 text-white px-3 rounded-md mt-3 cursor-pointer">
                  Submit
                </button>

                <div className="flex items-center justify-center w-full text-gray-700">
                  ------------OR------------
                </div>
                <div className="flex justify-center ">
                  <button className="bg-red-500 text-white px-3 py-2 rounded-md">
                    Detect Location
                  </button>
                </div>
              </div>
              <div className="bg-white border border-gray-100 shadow-xl rounded-md p-7 mt-4 space-y-2 h-max">
                <h1 className="text-gray-800 font-bold text-xl">
                  Bill Details
                </h1>
                <div className="flex justify-between items-center">
                  <h1 className="flex gap-1 items-center text-gray-700">
                    <span>
                      <LuNotebookText />
                    </span>
                    Item total
                  </h1>
                  <p>${totalPrice}</p>
                </div>
                <div className="flex justify-between items-center">
                  <h1 className="flex gap-1 items-center text-gray-700">
                    <span>
                      <MdDeliveryDining />
                    </span>
                    Delivery Charge
                  </h1>
                  <p className="text-red-500 font-semibold">
                    <span className="text-gray-600 line-through">$25</span> FREE
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <h1 className="flex gap-1 items-center text-gray-700">
                    <span>
                      <GiShoppingBag />
                    </span>
                    Coupon
                  </h1>
                  <span className="text-red-500 font-semibold">$25</span>
                </div>
                <hr className="text-gray-200 mt-2" />

                <div>
                  <div className="flex justify-between items-center">
                    <h1 className="font-semibold text-lg">Total</h1>
                    <p className="font-semibold text-lg">${totalPrice + 5.0}</p>
                  </div>
                  <div>
                    <h1 className="font-semibold text-gray-700 mb-3 mt-7">
                      Apply Promo Code
                    </h1>
                    <div className="flex gap-3">
                      <input
                        type="text"
                        placeholder="Enter code"
                        className="p-2 rounded-md w-full"
                      />
                      <button className="bg-white text-black border border-gray-200 px-4 cursor-pointer py-1 rounded-md">
                        Apply
                      </button>
                    </div>
                  </div>
                  <button className="bg-red-500 text-white px-3 py-2 rounded-md w-full cursor-pointer mt-3">
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 justify-center h-[600px]">
          <h1 className="text-red-500/80 font-bold text-5xl text-muted">
            Oh no! Your cart is empty.
          </h1>
          <img src={emptyCart} alt="" className="w-[400px]" />
          <button
            onClick={() => navigate("/products")}
            className="bg-red-500 text-white px-3 py-2 rounded-md cursor-pointer"
          >
            {" "}
            Countinue Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
