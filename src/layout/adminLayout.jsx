import React from "react";
import Navbar from "../Common/Navbar/Navbar";
import SideBar from "../modules/seller/components/SideBar";
import Footer from "../modules/seller/components/Footer";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-200">
      <Navbar />
      <div className="flex flex-grow">
        <SideBar />
        <main className="flex-1 p-5 overflow-x-hidden overflow-y-auto">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLayout;
