import { productsActions } from "./products-slice";

export const fetchProducts = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch("https://dummyjson.com/products");

      if (!response.ok) {
        throw new Error("Could not fetch products!");
      }

      const data = await response.json();
      return data;
    };

    try {
      const productsData = await fetchData();
      dispatch(
        productsActions.setProducts({ products: productsData.products })
      );
    } catch (error) {
      console.log("error", error.message);
    }
  };
};

export const setSearchedProducts = (searchTerm) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://dummyjson.com/products/search?q=" + searchTerm
      );
      console.log("response", response);
      if (!response.ok) {
        throw new Error("Could not fetch products!");
      }

      const data = await response.json();
      return data;
    };

    try {
      const productsData = await fetchData();
      dispatch(
        productsActions.setSearchedProducts({ products: productsData.products })
      );
    } catch (error) {
      console.log("error", error.message);
    }
  };
};

export const deleteProduct = (id) => {
  return async (dispatch) => {
    const deleteProductHandler = async () => {
      const response = await fetch(`https://dummyjson.com/products/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Could not fetch products!");
      }

      const data = await response.json();

      return data;
    };

    try {
      await deleteProductHandler();
      dispatch(productsActions.deleteProduct({ productId: id }));
    } catch (error) {
      console.log("error", error.message);
    }
  };
};

export const createProduct = (productData) => {
  return async (dispatch) => {
    const createProductHandler = async () => {
      const response = await fetch(`https://dummyjson.com/products/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });
      if (!response.ok) {
        throw new Error("Could not fetch products!");
      }

      const data = await response.json();
      console.log("data", data);
      return data;
    };

    try {
      const createdProduct = await createProductHandler();
      console.log("createdProduct", createdProduct);
      dispatch(
        productsActions.createProduct({
          product: {
            ...createdProduct,
            id: Math.floor(Math.random() * 1000 + 100),
          },
        })
      );
    } catch (error) {
      console.log("error", error.message);
    }
  };
};

export const updateProduct = (id, productData) => {
  return async (dispatch) => {
    const updateProductHandler = async () => {
      const response = await fetch(`https://dummyjson.com/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });
      if (!response.ok) {
        throw new Error("Could not fetch products!");
      }
      console.log("teke teke");
      const data = await response.json();
      console.log("data", data);
      return data;
    };

    try {
      const updatedProduct = await updateProductHandler();
      console.log("updatedProduct", updatedProduct);
      dispatch(
        productsActions.updateProduct({
          productId: id,
          product: updatedProduct,
        })
      );
    } catch (error) {
      console.log("error", error.message);
    }
  };
};
