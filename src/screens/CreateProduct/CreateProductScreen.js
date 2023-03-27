import React from "react";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createProduct, updateProduct } from "../../store/products-action";
import "./CreateProductForm.css"; // Import the CSS file
import { useToasts } from "react-toast-notifications";

const CreateProductForm = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { addToast } = useToasts();

  const isUpdateProduct = params.productId ? true : false;
  const productsList = useSelector((state) => state.products.products);
  const searchedProducts = useSelector(
    (state) => state.products.searchedProducts
  );
  const allProducts = productsList.concat(searchedProducts);
  const product = allProducts.find(
    (product) => product.id === Number(params.productId)
  );

  const createProductHandler = async (values) => {
    try {
      const newProduct = {
        title: values.name,
        description: "This is a description",
        price: 100,
        images: ["https://picsum.photos/200"],
        rating: values.rating,
        stock: 100,
        category: "category",
      };
      await dispatch(createProduct(newProduct));
      addToast("New Product Added", {
        appearance: "success",
        autoDismiss: true,
      });
    } catch (error) {
      addToast("Something Went Wrong", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  const updateProductHandler = async (values) => {
    try {
      const updatedProduct = {
        title: values.name,
        rating: values.rating,
      };
      await dispatch(updateProduct(product.id, updatedProduct));
      addToast("Product Updated", {
        appearance: "success",
        autoDismiss: true,
      });
    } catch (error) {
      addToast("Something Went Wrong", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  return (
    <Formik
      initialValues={{
        name: isUpdateProduct ? product?.title : "",
        Brand: isUpdateProduct ? product?.category : "",
        year: isUpdateProduct ? product?.year : "",
        rating: isUpdateProduct ? product?.rating : "",
      }}
      validate={(values) => {
        const errors = {};
        if (!values.name) {
          errors.name = "Required";
        }
        if (!values.Brand) {
          errors.Brand = "Required";
        }

        if (!values.year) {
          errors.year = "Year is required";
        } else if (isNaN(values.year)) {
          errors.year = "Invalid year";
        } else if (
          values.year < 1900 ||
          values.year > new Date().getFullYear()
        ) {
          errors.year = "Year must be between 1900 and the current year";
        }
        if (!values.rating) {
          errors.rating = "Required";
        } else if (
          isNaN(values.rating) ||
          values.rating < 0 ||
          values.rating > 5
        ) {
          errors.rating = "Should be between 0-5";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        isUpdateProduct
          ? updateProductHandler(values)
          : createProductHandler(values);
        setSubmitting(false);
      }}
    >
      {({ errors, isSubmitting, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <div className="form-field-container">
            <div className="form-field">
              <label htmlFor="name">Name</label>
              <Field type="text" name="name" id="name" />
              <ErrorMessage
                name="name"
                component="div"
                className="error-message"
              />
            </div>
            <div className="form-field">
              <label htmlFor="Brand">Brand</label>
              <Field type="text" name="Brand" id="Brand" />
              <ErrorMessage
                name="Brand"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-field">
              <label htmlFor="year">Year</label>
              <div style={{ marginTop: 15, marginBottom: 15 }}>
                <Field
                  id="year"
                  name="year"
                  type="number"
                  min="1900"
                  max="2099"
                />
              </div>

              <ErrorMessage
                name="year"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-field">
              <label htmlFor="rating">Rating</label>
              <div style={{ marginTop: 15, marginBottom: 15 }}>
                <Field type="number" name="rating" id="rating" />
              </div>
              <ErrorMessage
                name="rating"
                component="div"
                className="error-message"
              />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CreateProductForm;
