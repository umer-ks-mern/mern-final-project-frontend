import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { layoutRouter } from "./router/Layout";
import { nonLayoutRouter } from "./router/NonLayout";
import Layout from "./layout";
import Cart from "./modules/cart/components/Cart";
import CartView from "./modules/cart/pages/view";

const cart = [
  {
    _id: "6505633a5e1f00aab106609b",
    quantity: 2,
  },
  {
    _id: "650563645e1f00aab106609d",
    quantity: 3,
  },
];

const App = () => {
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, []);
  return (
    <>
      {/* <ToastContainer />
      <Routes>
        {nonLayoutRouter.map((ele) => (
          <Route path={ele.path} element={ele.element} />
        ))}
        <Route path="*" element={<h1>404</h1>} />

        <Route element={<Layout />}>
          {layoutRouter.map((ele) => (
            <Route path={ele.path} element={ele.element} />
          ))}
        </Route>
      </Routes> */}

      <CartView />
    </>
  );
};

export default App;
