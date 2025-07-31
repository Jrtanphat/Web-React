import { MapPin } from "lucide-react";
import React from "react";
import { FaCaretDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { cartItem } = useCart();
  return (
    <div className="bg-white py-3 shadow-2xl">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo section */}
        <div className="flex gap-7 items-center">
          <Link to={"/"}>
            <h1 className="font-bold text-3xl">
              {" "}
              <span className="text-red-500 font-serif">M</span>obile
            </h1>
          </Link>
          <div className="flex gap-1 cursor-pointer text-gray-700 items-center"></div>
        </div>
        {/* Menu section */}
        <nav className="flex gap-7 items-center">
          <ul className="flex gap-7 items-center text-xl font-semibold">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "border-b-3 border-red-500 transition-all"
                    : "text-black"
                }  cursor-pointer`
              }
            >
              <li>Home</li>
            </NavLink>
            <NavLink
              to={"/products"}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "border-b-3 border-red-500 transition-all"
                    : "text-black"
                }  cursor-pointer`
              }
            >
              <li>Product</li>
            </NavLink>
            <NavLink
              to={"/about"}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "border-b-3 border-red-500 transition-all"
                    : "text-black"
                }  cursor-pointer`
              }
            >
              <li>About</li>
            </NavLink>
            <NavLink
              to={"/contact"}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "border-b-3 border-red-500 transition-all"
                    : "text-black"
                }  cursor-pointer`
              }
            >
              <li>Contact</li>
            </NavLink>
          </ul>
          <Link to={"/cart"} className="relative">
            <IoCartOutline className="h-7 w-7" />
            <span className="bg-red-500 px-2 rounded-full absolute -top-3 -right-3 text-white">
              {cartItem.length}
            </span>
          </Link>
          <div>
            <SignedOut>
              <SignInButton className="bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer" />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
