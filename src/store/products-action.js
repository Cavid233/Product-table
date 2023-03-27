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

    const productsData = await fetchData();
    dispatch(productsActions.setProducts({ products: productsData.products }));
  };
};

export const setSearchedProducts = (searchTerm) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://dummyjson.com/products/search?q=" + searchTerm
      );
      if (!response.ok) {
        throw new Error("Could not fetch products!");
      }

      const data = await response.json();
      return data;
    };

    const productsData = await fetchData();
    dispatch(
      productsActions.setSearchedProducts({ products: productsData.products })
    );
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
    await deleteProductHandler();
    dispatch(productsActions.deleteProduct({ productId: id }));
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
      return data;
    };

    const createdProduct = await createProductHandler();
    dispatch(
      productsActions.createProduct({
        product: {
          ...createdProduct,
          id: Math.floor(Math.random() * 1000 + 100),
        },
      })
    );
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
      const data = await response.json();
      return data;
    };

    const updatedProduct = await updateProductHandler();
    dispatch(
      productsActions.updateProduct({
        productId: id,
        product: updatedProduct,
      })
    );
  };
};
