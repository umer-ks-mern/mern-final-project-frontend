import React, { useState,useEffect } from "react";
import * as Yup from "yup";
import { FormikProvider, useFormik, Field } from "formik";
import axios from "axios";
import { toast } from "react-toastify";

const UpdateProduct = ({id}) => {
  const productSchema = Yup.object({
    name: Yup.string().required("This field is required").min(3).max(30),
    price: Yup.string().required("This field is required").min(1),
    quantity: Yup.string().required("This field is required").min(0),
    category: Yup.string().required("This field is required").min(3).max(100),
    description: Yup.string().required("This field is required").max(1000),
  });

const[prevValues,setPrevValues]=useState({
    name:"",
    price:"",
    category:"",
    quantity:"",
    description:""
})

  useEffect(() => {
    axios.get(`http://localhost:3300/product/${id}`)
    .then((response) => {

      setPrevValues(response.data) ;
    })
    .catch((error) => {
      console.error('Error fetching product data:', error);
    });
}, [id]);

  const formik = useFormik({
    initialValues: {
      name: prevValues.name,
      price: prevValues.price,
      category: prevValues.category,
      quantity: prevValues.quantity,
      description: prevValues.description,
    },
   
    validationSchema: productSchema,
    onSubmit: (values) => {
      
    axios.put(`http://localhost:3300/products/${id}`, values)
    .then((response) => {
        toast.success("Product updated successfully!")
    })
    .catch((error) => {
      toast.error('Error updating product:', error)
    });
     },
  });





  return (
    <FormikProvider value={formik}>
      <form className="cf" id="my_form">
        <div className="half left cf">
          <Field type="text" id="name" placeholder="Name" name="name" />
          <Field
            type="text"
            id="category"
            placeholder="Category"
            name="category"
          />
          <Field
            type="text"
            id="input-subject"
            placeholder="Price"
            name="price"
          />
          {formik.touched.name && formik.errors.name && (
            <h6>{formik.errors.name}</h6>
          )}
          <Field
            type="text"
            id="input-subject"
            placeholder="Quantity"
            name="quantity"
          />
          {formik.touched.quantity && formik.errors.quantity && (
            <h6>{formik.errors.quantity}</h6>
          )}
        </div>
        <div className="half right cf">
          <Field
            name="description"
            type="text"
            id="input-message"
            placeholder="Description"
          />
          {formik.touched.description && formik.errors.description && (
            <h6>{formik.errors.description}</h6>
          )}
        </div>
        <button onClick={formik.handleSubmit}>Add Product</button>
      </form>
    </FormikProvider>
  );
};

export default UpdateProduct;