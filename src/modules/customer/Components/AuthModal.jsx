import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import Cookies from "js-cookie";
import {  decodeToken } from "react-jwt";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AuthModal({ isSignin, onAuthentication }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    address: "", 
    phone: "",  
    role: "customer", 
  });

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigation = useNavigate();

  const renderContent = (signInContent, signUpContent) => {
    return isSignin ? signInContent : signUpContent;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const endpoint = isSignin ? "/user/login" : "/user/register";

    try {
      const response = await axios.post(`http://localhost:3300${endpoint}`, {
        ...formData,
      });

      if (
        response.data.token &&
        (response.status === 200 || response.status === 201)
      ) {
        Cookies.set("token", response.data.token);
        // const headers = { 'Authorization': 'Bearer ' + response.data.token };

        handleClose();
        const decodedToken = decodeToken(response.data.token);
        

        try {
          
          toast.success(!isSignin ? "Registration Successful" : "Login Successful");
          
        } catch (error) {
          toast.error(error); 
        }

        if (decodedToken.role !== 'admin' ) {
          onAuthentication(true);
          navigation("/");
        }else{
          onAuthentication(true);
          navigation('/admin')
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button
        className={`${renderContent(
          "bg-blue-400 text-white",
          "bg-purple-400 text-white"
        )} border p-1 px-4 rounded mr-3`}
        onClick={handleOpen}
      >
        {renderContent("Sign In", "Sign Up")}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {renderContent("Sign In", "Sign Up")}
          </Typography>
          <form onSubmit={handleSubmit}>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {renderContent(
                "Welcome back! Please sign in.",
                "Join us by creating an account."
              )}
            </Typography>
            {!isSignin && (
              <>
                <div className="mt-4">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full p-2 border rounded mt-1"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mt-4">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    className="w-full p-2 border rounded mt-1"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mt-4">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    className="w-full p-2 border rounded mt-1"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mt-4">
                  <label htmlFor="role">Role</label>
                  <select
                    id="role"
                    name="role"
                    className="w-full p-2 border rounded mt-1"
                    onChange={handleChange}
                    required
                    value={formData.role}
                  >
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </>
            )}
            <div className="mt-4">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-2 border rounded mt-1"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mt-4">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full p-2 border rounded mt-1"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-lg transition duration-300"
              >
                {renderContent("Sign In", "Sign Up")}
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
