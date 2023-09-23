import React from "react";
import * as Yup from "yup";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { toast } from "react-toastify";

const DynamicForm = ({ fields, onSubmit, initialValues }) => {
  const validationSchema = Yup.object().shape(
    fields.reduce((acc, field) => {
      acc[field.name] = field.validation || Yup.string();
      return acc;
    }, {})
  );

  const fieldComponents = {
    text: (field) => (
      <Field
        type="text"
        name={field.name}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
      />
    ),
    number: (field) => (
      <Field
        type="number"
        name={field.name}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
      />
    ),
    textarea: (field) => (
      <Field
        as="textarea"
        name={field.name}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
      />
    ),
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          await onSubmit(values);
          resetForm();
        } catch (error) {
          toast.error(error.response.statusText);
        }
      }}
    >
      <Form className="grid grid-cols-3 gap-4">
        {fields.slice(0, 3).map((field) => (
          <div key={field.name}>
            <label
              htmlFor={field.name}
              className="block text-gray-700 font-semibold mb-2"
            >
              {field.label}
            </label>
            {fieldComponents[field.type](field)}
            <ErrorMessage
              name={field.name}
              component="p"
              className="text-red-500"
            />
          </div>
        ))}
        <div className="col-span-3">
          {fields.slice(3, 5).map((field) => (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="block text-gray-700 font-semibold mb-2"
              >
                {field.label}
              </label>
              {fieldComponents[field.type](field)}
              <ErrorMessage
                name={field.name}
                component="p"
                className="text-red-500"
              />
            </div>
          ))}
        </div>
        <div className="col-span-3">
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
          >
            Submit
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default DynamicForm;
