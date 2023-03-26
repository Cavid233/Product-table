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
      // dispatch(
      //     uiActions.showNotification({
      //     status: "error",
      //     title: "Error!",
      //     message: "Fetching products failed!",
      //     })
      // );
    }
  };
};

export const deleteProduct = (id) => {
  return async (dispatch) => {
    console.log("Kes lan")
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
      dispatch(
        productsActions.deleteProduct({ productId: id })
      );
    } catch (error) {
      // dispatch(
      //     uiActions.showNotification({
      //     status: "error",
      //     title: "Error!",
      //     message: "Fetching products failed!",
      //     })
      // );
    }
  };
};
