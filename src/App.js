import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { nonLayoutRouter } from "./router/NonLayout";
import { LayoutRouter } from "./router/Layout";
import Layout from "./layout";
import { sellerRoutes } from "./modules/seller/routes";
import "react-toastify/dist/ReactToastify.css";
import AdminLayout from "./layout/adminLayout";

const cart = [
  {
    _id: "6505633a5e1f00aab106609b",
    quantity: 5,
  },
  {
    _id: "650563645e1f00aab106609d",
    quantity: 5,
  },
  {
    _id: "650863f741637fd6dadfe673",
    quantity: 5,
  },
];

const App = () => {
  // Store the updated cart data in local storage
  localStorage.setItem(`cart`, JSON.stringify(cart));
  return (
    <>
      <ToastContainer />
      <Routes>
        {nonLayoutRouter.map((ele, index) => (
          <Route key={index} path={ele.path} element={ele.element} />
        ))}
        <Route path="*" element={<h1>404</h1>} />

        <Route element={<Layout />}>
          {LayoutRouter.map((ele, index) => (
            <Route key={index} path={ele.path} element={ele.element} />
          ))}
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          {sellerRoutes.map((ele, index) => (
            <Route key={index} path={ele.path} element={ele.element} />
          ))}
        </Route>
      </Routes>
    </>
  );
};

export default App;
