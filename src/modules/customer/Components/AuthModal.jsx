import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Cookies from "js-cookie";
import { decodeToken, isExpired } from "react-jwt";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DynamicForm from "../../../layout/Form.layout";

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

const initialFormData = {
  email: "",
  password: "",
  name: "",
  address: "",
  phone: "",
  role: "customer",
};

export default function AuthModal({ isSignin, onAuthentication }) {
  const [formData, setFormData] = useState(initialFormData);
  const [open, setOpen] = useState(false);
  const navigation = useNavigate();

  const isSignup = !isSignin;
  const actionText = isSignin ? "Sign In" : "Sign Up";

  const handleSubmit = async (values) => {
    const endpoint = isSignin ? "/user/login" : "/user/register";

    try {
      const response = await axios.post(`http://localhost:3300${endpoint}`, {
        ...values,
      });

      if (
        response.data.token &&
        (response.status === 200 || response.status === 201)
      ) {
        Cookies.set("token", response.data.token);
        handleClose();
        const decodedToken = decodeToken(response.data.token);
        const Tokenexpired = isExpired(response.data.token);

        try {
          toast.success(
            isSignin ? "Login Successful" : "Registration Successful"
          );
        } catch (error) {
          toast.error(error);
        }

        if (decodedToken.role !== "admin") {
          onAuthentication(true);
          navigation("/");
        } else {
          onAuthentication(true);
          navigation("/admin");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fields = [
    { name: "email", label: "Email", type: "email" },
    { name: "password", label: "Password", type: "password" },
    ...(isSignup
      ? [
          { name: "name", label: "Name", type: "text" },
          { name: "address", label: "Address", type: "text" },
          { name: "phone", label: "Phone", type: "text" },
          {
            name: "role",
            label: "Role",
            type: "select",
            options: ["customer", "admin"],
          },
        ]
      : []),
  ];

  const handleClose = () => {
    setOpen(false);
    setFormData(initialFormData);
  };

  return (
    <div>
      <button
        className={`${
          isSignin ? "bg-blue-400" : "bg-purple-400"
        } text-white border p-1 px-4 rounded mr-3`}
        onClick={() => setOpen(true)}
      >
        {actionText}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {actionText}
          </Typography>
          <DynamicForm
            fields={fields}
            initialValues={formData}
            onSubmit={handleSubmit}
          />
        </Box>
      </Modal>
    </div>
  );
}
