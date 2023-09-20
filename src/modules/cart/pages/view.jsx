import { useEffect, useState } from "react";
import Cart from "../components/Cart";
import axios from "axios";

const CartView = () => {
  const [cart, setCart] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const userCart = JSON.parse(localStorage.getItem("cart"));
    if (userCart) setCart(userCart);
    const storedUserID = localStorage.getItem("userID");
    if (storedUserID) setUserId(storedUserID);
  }, []);

  const checkOutHandel = () => {
    console.log(JSON.parse(localStorage.getItem("cart")));

    axios
      .post(`http://localhost:3300/checkout`, {
        user_id: "650564865e1f00aab10660a5",
        products: [
          {
            product_id: cart[0]._id,
            quantity: cart[0].quantity,
          },
          {
            product_id: cart[1]._id,
            quantity: cart[1].quantity,
          },
        ],
      })
      .then((res) => {
        if (res.data) console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {cart.map((cartItem, index) => (
        <Cart key={index + 1} _id={cartItem._id} quantity={cartItem.quantity} />
      ))}
      <button onClick={checkOutHandel}>Check Out</button>
    </div>
  );
};

export default CartView;
