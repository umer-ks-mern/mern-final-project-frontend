import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { layoutRouter } from "./router/Layout";
import { nonLayoutRouter } from "./router/NonLayout";
import Layout from "./layout";

const App = () => {
  return (
    <>
      <ToastContainer />
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
      </Routes>
    </>
  );
};

export default App;
