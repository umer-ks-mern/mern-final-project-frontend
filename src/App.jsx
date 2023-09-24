import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { nonLayoutRouter } from "./router/NonLayout";
import { LayoutRouter } from "./router/Layout";
import Layout from "./layout";
import { sellerRoutes } from "./modules/seller/routes";
import "react-toastify/dist/ReactToastify.css";
import AdminLayout from "./layout/adminLayout";

const App = () => {
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
