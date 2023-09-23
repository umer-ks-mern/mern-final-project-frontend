import { useEffect, useState } from "react";
import Cart from "../components/Cart";
import axios from "axios";
import Navbar from "../../../Common/Navbar/Navbar";
import Cookies from "js-cookie";
import { decodeToken } from "react-jwt";

const CartView = () => {
  const [cart, setCart] = useState([]);
  const [userId, setUserId] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const token = Cookies.get("token");
    const { id } = decodeToken(token);
    setUserId(id);

    const userCart = JSON.parse(localStorage.getItem(`${id}_cart`));
    if (userCart) {
      setCart(userCart); // Calculate the total when the cart is loaded
    }
  }, []);

  useEffect(() => calculateTotal(), [cart]);
  const calculateTotal = () => {
    const totalPrice = cart.reduce((accumulator, cartItem) => {
      return accumulator + cartItem.price * cartItem.quantity;
    }, 0);
    setTotal(totalPrice);
  };

  const checkOutHandle = () => {
    axios
      .post(`http://localhost:3300/checkout`, {
        user_id: userId,
        products: cart.map((cartItem) => ({
          product_id: cartItem.id,
          quantity: cartItem.quantity,
        })),
      })
      .then((res) => {
        if (res.data) console.log(res.data);
        // clear the cart
        localStorage.setItem(`${userId}_cart`, JSON.stringify([]));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Navbar />
      {cart.map((cartItem, index) => (
        <Cart key={index} _id={cartItem.id} quantity={cartItem.quantity} />
      ))}
      <div className="container justify-between flex flex-row fixed border rounded-md shadow-md items-center">
        <button
          className="m-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={checkOutHandle}
        >
          Checkout
        </button>{" "}
        <h6>Total: {total}</h6>
      </div>
    </div>
  );
};

export default CartView;
