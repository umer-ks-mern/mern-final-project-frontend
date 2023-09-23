import React, { useEffect } from "react";
import * as Yup from "yup";
import { FormikProvider, useFormik, Field } from "formik";
import axios from "axios";

const UpdateProduct = () => {
  const productSchema = Yup.object({
    name: Yup.string().required("This field is required").min(3).max(30),
    price: Yup.number().required("This field is required").min(1),
    quantity: Yup.number().required("This field is required").min(0),
    category: Yup.string().required("This field is required").min(3).max(100),
    description: Yup.string().required("This field is required").max(1000),
  });

  const formik = useFormik({
    initialValues: {},
    validationSchema: productSchema,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      axios.put("http://localhost:3300/product", values);
      resetForm();
    },
  });

  useEffect(() => {
    // Fetch existing data from the server using Axios
    axios
      .get("http://localhost:3300/product")
      .then((response) => {
        const data = response.data;
        // Populate the form fields with the fetched data
        formik.setValues(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <FormikProvider value={formik}>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1 p-4">
          <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
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
        <div className="col-span-1 p-4">
          <label htmlFor="category" className="block text-gray-700 font-semibold mb-2">
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
        <div className="col-span-1 p-4">
          <label htmlFor="price" className="block text-gray-700 font-semibold mb-2">
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
        <div className="col-span-1 p-4">
          <label htmlFor="quantity" className="block text-gray-700 font-semibold mb-2">
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
        <div className="col-span-3 p-4">
          <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">
            Description
          </label>
          <Field
            as="textarea"
            id="description"
            name="description"
            className="w-full h-32 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            placeholder="Description"
          />
          {formik.touched.description && formik.errors.description && (
            <p className="text-red-500">{formik.errors.description}</p>
          )}
        </div>
        <div className="col-span-3 p-4">
          <button
            onClick={formik.handleSubmit}
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
          >
            Update Product
          </button>
        </div>
      </div>
    </FormikProvider>
  );
};

export default UpdateProduct;
