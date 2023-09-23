import React, { useEffect } from "react";
import Navbar from "../Common/Navbar/Navbar";
import SideBar from "../modules/seller/components/SideBar";
import Footer from "../modules/seller/components/Footer";
import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import {  decodeToken } from "react-jwt";
import { toast } from "react-toastify";

const AdminLayout = () => {
  const token = Cookies.get("token");
  const decodedToken = decodeToken(token);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if there's no token or the user is not an admin
    if (!token || decodedToken.role !== "admin") {
      navigate("/");
      toast.dark("Unauthorized");
    }
  }, [token, decodedToken.role, navigate]);

  // If unauthorized, don't render the layout, return null
  if (!token || decodedToken.role !== "admin") {
    return null;
  }

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
