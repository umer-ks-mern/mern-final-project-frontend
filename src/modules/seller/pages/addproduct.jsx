import React from "react";
import * as Yup from "yup";
import { FormikProvider, useFormik, Field } from "formik";
import axios from "axios";
import Cookies from "js-cookie";
import {  decodeToken } from "react-jwt";



const AddProduct = () => {
  const token=Cookies.get('token')
  const {role}=ecodeToken(token)

  const productSchema = Yup.object({
    name: Yup.string()
      .required("This field is required")
      .min(3)
      .max(30),
    price: Yup.number()
      .required("This field is required")
      .min(1),
    quantity: Yup.number()
      .required("This field is required")
      .min(0),
    category: Yup.string()
      .required("This field is required")
      .min(3)
      .max(100),
    description: Yup.string()
      .required("This field is required")
      .max(1000),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      category: "",
      quantity: "",
      description: "",
    },
    validationSchema: productSchema,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      const headers={
       
        "Authorization":`Bearer ${token}`,
        "user-role":role

      }
      axios.post("http://localhost:3300/product/create", values,{headers});
      resetForm();
    },
  });

  return (
    <FormikProvider value={formik}>
      <div className="flex flex-wrap justify-center p-4">
        <div className="w-full sm:w-1/2 md:w-1/3 p-4">
          <label
            htmlFor="name"
            className="block text-gray-700 font-semibold mb-2"
          >
            Name
          </label>
          <Field
            type="text"
            id="name"
            name="name"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            placeholder="Name"
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500">{formik.errors.name}</p>
          )}
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 p-4">
          <label
            htmlFor="category"
            className="block text-gray-700 font-semibold mb-2"
          >
            Category
          </label>
          <Field
            type="text"
            id="category"
            name="category"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            placeholder="Category"
          />
          {formik.touched.category && formik.errors.category && (
            <p className="text-red-500">{formik.errors.category}</p>
          )}
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 p-4">
          <label
            htmlFor="price"
            className="block text-gray-700 font-semibold mb-2"
          >
            Price
          </label>
          <Field
            type="number"
            id="price"
            name="price"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            placeholder="Price"
          />
          {formik.touched.price && formik.errors.price && (
            <p className="text-red-500">{formik.errors.price}</p>
          )}
        </div>
        <div className="w-full p-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-semibold mb-2"
          >
            Description
          </label>
          <Field
            as="textarea"
            id="description"
            name="description"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            placeholder="Description"
            rows="4"
          />
          {formik.touched.description && formik.errors.description && (
            <p className="text-red-500">{formik.errors.description}</p>
          )}
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 p-4">
          <label
            htmlFor="quantity"
            className="block text-gray-700 font-semibold mb-2"
          >
            Quantity
          </label>
          <Field
            type="number"
            id="quantity"
            name="quantity"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            placeholder="Quantity"
          />
          {formik.touched.quantity && formik.errors.quantity && (
            <p className="text-red-500">{formik.errors.quantity}</p>
          )}
        </div>
        
        <div className="w-full p-4">
          <button
            onClick={formik.handleSubmit}
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
          >
            Add Product
          </button>
        </div>
      </div>
    </FormikProvider>
  );
};

export default AddProduct;
