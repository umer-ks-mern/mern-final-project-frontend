import React from "react";
import * as Yup from "yup";
import DynamicForm from '../../../layout/Form.layout'
import Cookies from "js-cookie";
import { decodeToken } from "react-jwt";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
    const { product_id } = useParams()
    const navigation=useNavigate()
  
  const fields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      validation: Yup.string()
        .required("This field is required")
        .min(3)
        .max(30),
    },
    {
      name: "category",
      label: "Category",
      type: "text",
      validation: Yup.string()
        .required("This field is required")
        .min(3)
        .max(100),
    },
    {
      name: "price",
      label: "Price",
      type: "number",
      validation: Yup.number()
        .required("This field is required")
        .min(1),
    },
    {
      name: "quantity",
      label: "Quantity",
      type: "number",
      validation: Yup.number()
        .required("This field is required")
        .min(0),
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      validation: Yup.string()
        .required("This field is required")
        .max(1000),
    },
  ];
  const token = Cookies.get("token");
  const { role } = decodeToken(token);
  const headers = {
    Authorization: `Bearer ${token}`,
    "user-role": role,
  };
  // Define the onSubmit function for this form
  const handleSubmit = async (values) => {
    try {
      // Handle form submission here, e.g., make an API request
      axios.put(`http://localhost:3300/product/${product_id}`, values,{headers})
    .then((response) => {

        toast.success("Product updated successfully!")
        navigation("/admin/viewproducts")
        
        
    })
    .catch((error) => {
      console.log(error)
    });
    
    } catch (error) {
      // Handle errors, e.g., show a toast message
      console.error("Form submission error:", error);
    }
  };

  return (
    <div>
      <h1>Add Product</h1>
      <DynamicForm
        fields={fields}
        onSubmit={handleSubmit}
        initialValues={{}}
      />
    </div>
  );
};

export default UpdateProduct;




