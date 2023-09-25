import { useEffect, useState } from "react";
import Cart from "../components/Cart";
import Navbar from "../../../Common/Navbar/Navbar";
import Cookies from "js-cookie";
import { decodeToken } from "react-jwt";
import { useNavigate } from "react-router-dom";

const CartView = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const token = Cookies.get("token");
    const { id } = decodeToken(token);

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

  return (
    <div>
      <Navbar />
      {cart.map((cartItem, index) => (
        <Cart key={index} _id={cartItem.id} quantity={cartItem.quantity} />
      ))}
      <div className="fixed bottom-0 left-0 w-full bg-white py-2 px-10 border-t border-gray-300 shadow-md flex justify-between items-center">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={() => navigate("/checkout")}
        >
          Checkout
        </button>{" "}
        <h6 className="text-lg font-semibold">Total: {total}</h6>
      </div>
    </div>
  );
};

export default CartView;
