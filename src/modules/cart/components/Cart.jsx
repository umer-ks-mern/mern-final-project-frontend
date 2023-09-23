import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { decodeToken } from "react-jwt";

const Cart = ({ _id, quantity }) => {
  const [cart, setCart] = useState([]);
  const [userId, setUserId] = useState(null);
  const [product, setProduct] = useState(null);
  const [productQuantity, setProductQuantity] = useState(quantity);
  const [quantityChange, setQuantityChange] = useState(0); //to updated product get from db when whenever quantity is changed to verify

  useEffect(() => {
    const token = Cookies.get("token");
    const { id } = decodeToken(token);
    console.log(id);
    setUserId(id);
    axios
      .get(`http://localhost:3300/product/${_id}`)
      .then((res) => {
        if (res.data) setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [_id, quantityChange]);

  const minusClickHandle = () => {
    if (productQuantity > 1) {
      const existingCartData =
        JSON.parse(localStorage.getItem(`${userId}_cart`)) || [];

      console.log(existingCartData);
      const productIndex = existingCartData.findIndex(
        (item) => item.id === _id
      );

      if (productIndex !== -1) {
        existingCartData[productIndex].quantity -= 1;
        setProductQuantity(productQuantity - 1);
      }
      // Store the updated cart data in local storage
      localStorage.setItem(`${userId}_cart`, JSON.stringify(existingCartData));
    } else {
      alert(`Quantity cannot go below 1`);
    }
  };

  const plusClickHandle = () => {
    setQuantityChange(quantityChange + 1);
    if (productQuantity < product.quantity) {
      const existingCartData =
        JSON.parse(localStorage.getItem(`${userId}_cart`)) || [];

      console.log(existingCartData);
      const productIndex = existingCartData.findIndex(
        (item) => item.id === _id
      );

      if (productIndex !== -1) {
        existingCartData[productIndex].quantity += 1;
        setProductQuantity(productQuantity + 1);
      }
      // Store the updated cart data in local storage
      localStorage.setItem(`${userId}_cart`, JSON.stringify(existingCartData));
    } else {
      alert(`Quantity cannot exceed ${product.quantity}`);
    }
  };

  let totalAmount = 0;

  if (product) {
    totalAmount = product.price * productQuantity;
  }

  return (
    <>
      {product && (
        <div className="container mx-auto p-2">
          <div className="flex border rounded-md shadow-md items-center">
            <img
              // src="https://www.jerdoni.com/cdn/shop/products/Back_abe5095c-126c-42ff-8397-257dc9a2f790.jpg?v=1659701957"
              src="http://localhost:3300/static/images//logo.png"
              alt={product.name}
              className="w-24 h-24 m-2 rounded-md"
            />
            <div className="flex-grow">
              <h3>{product.name}</h3>
              <p className="text-green-600 font-semibold">Rs:{product.price}</p>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex m-4 space-x-2 bg-gray-100 rounded-lg border border-gray-300 items-center">
                <h4
                  onClick={minusClickHandle}
                  className="px-3 py-1 text-red-500 rounded-md cursor-pointer select-none"
                >
                  -
                </h4>
                <p className="text-gray-600 mb-2 ">
                  Quantity: {productQuantity}
                </p>
                <h4
                  onClick={plusClickHandle}
                  className="px-3 py-1 text-green-500 rounded-md cursor-pointer select-none"
                >
                  +
                </h4>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
