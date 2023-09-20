import axios from "axios";
import React, { useEffect, useState } from "react";

const Cart = ({ _id, quantity }) => {
  const [product, setProduct] = useState(null);
  const [productQuantity, setProductQuantity] = useState(quantity);
  useEffect(() => {
    axios
      .get(`http://localhost:3300/product/${_id}`)
      .then((res) => {
        if (res.data) setProduct(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [_id, productQuantity]);

  const minusClickHandle = () => {
    if (productQuantity > 1) {
      const userCart = JSON.parse(localStorage.getItem("cart"));
      for (let i = 0; i < userCart.length; i++) {
        if (userCart[i]._id === _id) {
          userCart[i].quantity -= 1;
          console.log(userCart[i].quantity);
          console.log(userCart);
          setProductQuantity(productQuantity - 1);
          localStorage.setItem("cart", JSON.stringify(userCart));
          console.log(JSON.parse(localStorage.getItem("cart")));
          return;
        }
      }
    } else {
      alert("Quantity not be decreased than 1");
      return;
    }
  };

  const plusClickHandle = () => {
    if (productQuantity < product.quantity) {
      const userCart = JSON.parse(localStorage.getItem("cart"));
      for (let i = 0; i < userCart.length; i++) {
        if (userCart[i]._id === _id) {
          userCart[i].quantity += 1;
          console.log(userCart[i].quantity);
          console.log(userCart);
          setProductQuantity(productQuantity + 1);
          localStorage.setItem("cart", JSON.stringify(userCart));
          console.log(JSON.parse(localStorage.getItem("cart")));
          return;
        }
      }
    } else {
      alert(`Quantity not be Exceed than ${product.quantity}`);
      return;
    }
  };

  return (
    <>
      {product && (
        <div>
          {/* <img src="" alt="" /> */}
          <h4>{product.name}</h4>
          <p>{productQuantity}</p>
          <p>{product.price}</p>
          <button onClick={minusClickHandle}>-</button>
          <button onClick={plusClickHandle}>+</button>
        </div>
      )}
    </>
  );
};

export default Cart;
