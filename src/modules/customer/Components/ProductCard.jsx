import React from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { isExpired, decodeToken } from "react-jwt";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ id, name, category, price, quantity, description }) => {
  const token = Cookies.get("token") || "";
  let user = "";
  console.log(token);
  if (token) {
    user = decodeToken(token);
    console.log(user);
  }

  const navigate = useNavigate();

  const addToCart = () => {
    if (token) {
      const existingCartData =
        JSON.parse(localStorage.getItem(`${user.id}_cart`)) || [];

      const productIndex = existingCartData.findIndex((item) => item.id === id);

      if (productIndex !== -1) {
        existingCartData[productIndex].quantity += 1;
      } else {
        existingCartData.push({ id, name, price, quantity: 1 });
      }

      // Store the updated cart data in local storage
      localStorage.setItem(`${user.id}_cart`, JSON.stringify(existingCartData));
      toast.success("Product Added to cart");
    } else {
      toast.error("Please login to add product to cart");
    }
  };

  return (
    <div
      onClick={() => navigate(`/product/${id}`)}
      className="border rounded-lg shadow-md bg-white overflow-hidden"
    >
      {/* Product Image Skeleton Loader */}
      {/* <div className="animate-pulse bg-gray-200 w-full h-40"></div> */}
      <img
        src="https://www.jerdoni.com/cdn/shop/products/Back_abe5095c-126c-42ff-8397-257dc9a2f790.jpg?v=1659701957"
        alt={name}
      />

      <div className="p-4">
        <h1 className="text-xl font-semibold mb-2">{name}</h1>
        <p className="text-gray-600 text-sm mb-2">{category}</p>
        <h2 className="text-lg font-bold mb-2">${price}</h2>
        <p className="text-gray-600 text-sm">Quantity: {quantity} in stock</p>
        <p className="text-gray-700 mt-2">{description}</p>

        {/* Add to Cart Button */}
        <button
          onClick={addToCart}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
