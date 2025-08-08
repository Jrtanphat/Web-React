import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../assets/animation/Loading1.webm";
import Breadcrums from "../components/Breadcrums";
import { IoCartOutline } from "react-icons/io5";
import { useCart } from "../context/CartContext";

const DetailProduct = () => {
  const params = useParams();
  const [productDetails, SetProductDetails] = React.useState("");
  const { addToCart } = useCart();

  const getProductDetails = async () => {
    try {
      const response = await axios.get(
        `https://fakestoreapi.in/api/products/${params.id}`
      );
      const product = response.data.product;
      SetProductDetails(product);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  const OriginalPrice = Math.round(
    productDetails.price +
      productDetails.price * (productDetails.discount / 100)
  );
  return (
    <>
      {productDetails ? (
        <div className="px-4 pb-4 md:px-0">
          <Breadcrums title={productDetails.title} />
          <div className="max-w-6xl mx-auto md:p-6 grid grid-cols-2 gap-10 ">
            <div className="w-full">
              <img
                src={productDetails.image}
                alt={productDetails.title}
                className="rounded-2xl w-full object-cover "
              />
            </div>
            {/* product category */}
            <div className="flex flex-col gap-6 ">
              <h1 className="md:text-3xl font-bold text-gray-800">
                {productDetails.title}
              </h1>
              <div className="text-gray-700 cursor-pointer">
                {productDetails.brand?.toUpperCase()} /
                {productDetails.category?.toUpperCase()}/{productDetails.model}
              </div>

              {/* product price */}
              <div className="flex items-center space-x-2 text-xl font-bold">
                <span className="text-red-500">${productDetails.price}</span>
                <span className="line-through text-gray-700">
                  ${OriginalPrice}
                </span>
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                  {productDetails.discount}% discount
                </span>
              </div>

              {/* product description */}
              <p className="text-gray-600">{productDetails.description}</p>

              {/* quantity select */}
              <div className="flex items-center gap-4">
                <label htmlFor="" className="text-sm font-medium text-gray-700">
                  Quantity:
                </label>
                <input
                  type="number"
                  min={1}
                  value={1}
                  className="w-20 border border-gray-300 rounded-lg px-3 py-1
                focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* button proceed */}
              <div className="flex gap-4 mt-4 ">
                <button
                  onClick={() => addToCart(productDetails)}
                  className="px-6 flex gap-2 py-2 text-lg bg-red-500 text-white rounded-md"
                >
                  <IoCartOutline className="w-6 h-6" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <video muted autoPlay loop>
            <source src={Loading} type="video/webm" />
          </video>
        </div>
      )}
    </>
  );
};

export default DetailProduct;
