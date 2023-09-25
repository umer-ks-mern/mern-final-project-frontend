import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { isExpired, decodeToken } from "react-jwt";
import Navbar from "../../../Common/Navbar/Navbar";

const Product = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  const token = Cookies.get("token") || "";

  let user = "";
  console.log(token);
  if (token) {
    user = decodeToken(token);
    console.log(user);
  }

  useEffect(() => {
    axios
      .get(`http://localhost:3300/product/${id}`)
      .then((res) => {
        if (res.data) setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const addToCart = () => {
    if (token) {
      const existingCartData =
        JSON.parse(localStorage.getItem(`${user.id}_cart`)) || [];

      const productIndex = existingCartData.findIndex((item) => item.id === id);

      if (productIndex !== -1) {
        existingCartData[productIndex].quantity += 1;
      } else {
        existingCartData.push({
          id: product._id,
          name: product.name,
          price: product.price,
          quantity: 1,
        });
      }

      localStorage.setItem(`${user.id}_cart`, JSON.stringify(existingCartData));
      toast.success("Product Added to cart");
    } else {
      toast.error("Please login to add product to cart");
    }
  };

  return (
    <>
      {product && (
        <>
          <Navbar />
          <div className="border rounded-lg shadow-md bg-white overflow-hidden flex">
            <div className="w-1/2">
              <img
                src="https://www.jerdoni.com/cdn/shop/products/Back_abe5095c-126c-42ff-8397-257dc9a2f790.jpg?v=1659701957"
                alt={product.name}
              />
            </div>
            <div className="w-1/2 p-4">
              <h1 className="font-semibold mb-2">{product.name}</h1>
              <p className="text-gray-600 mb-2">{product.category}</p>
              <h2 className="font-bold mb-2">${product.price}</h2>
              <p className="text-gray-700 mt-2">{product.description}</p>
              <p className="text-gray-600 text-sm">
                Quantity: {product.quantity} in stock
              </p>

              <button
                onClick={addToCart}
                className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Product;
