import { useEffect, useState } from "react";
import Cart from "../components/Cart";
import axios from "axios";
import Navbar from "../../../Common/Navbar/Navbar";
import Cookies from "js-cookie";
import { decodeToken } from "react-jwt";

const CheckoutPage = () => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState({});
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const token = Cookies.get("token");
    const { id } = decodeToken(token);

    axios
      .get(`http://localhost:3300/user/${id}`)
      .then((res) => {
        if (res.data) setUser(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    const userCart = JSON.parse(localStorage.getItem(`${id}_cart`));
    if (userCart) {
      setCart(userCart); // Calculate the total when the cart is loaded
    }
  }, []);

  useEffect(() => {
    calculateTotal();
  }, [cart]);
  const calculateTotal = () => {
    const totalPrice = cart.reduce((accumulator, cartItem) => {
      return accumulator + cartItem.price * cartItem.quantity;
    }, 0);
    setTotal(totalPrice);
  };

  const checkOutHandle = () => {
    axios
      .post(`http://localhost:3300/checkout`, {
        user_id: user._id,
        products: cart.map((cartItem) => ({
          product_id: cartItem.id,
          quantity: cartItem.quantity,
        })),
      })
      .then((res) => {
        if (res.data) console.log(res.data);
        // clear the cart
        localStorage.setItem(`${user._id}_cart`, JSON.stringify([]));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Navbar />
      <h3 className="text-xl font-semibold text-gray-800 mx-20 mt-5">
        <strong>Name: </strong>
        {user.name}
      </h3>
      <h3 className="text-xl font-semibold text-gray-800 mx-20 mt-1">
        <strong>Address: </strong>
        {user.address}
      </h3>
      <div className="flex flex-col h-screen px-20 py-2">
        <table className="border-collapse border border-gray-300">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2">Item Name</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((cartItem, index) => (
              <tr key={index} className="bg-white">
                <td className="px-4 py-2 border border-gray-300">
                  {cartItem.name}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {cartItem.quantity}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {cartItem.price}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {cartItem.price * cartItem.quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="fixed bottom-0 left-0 w-full bg-white py-2 px-10 border-t border-gray-300 shadow-md flex justify-between items-center">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={checkOutHandle}
          >
            Place Order
          </button>{" "}
          <h6 className="text-lg font-semibold">Total: {total}</h6>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
