import React, { useEffect } from "react";

import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductStoreScreen from "./screens/ProductStore/ProductStoreScreen";
import CreateProductScreen from "./screens/CreateProduct/CreateProductScreen";
import RootLayout from "./screens/Root/Root";
import ErrorPage from "./screens/Error/Error";
import { useDispatch } from "react-redux";
import { fetchProducts } from "./store/products-action";
import { ToastProvider } from "react-toast-notifications";
import { uiActions } from "./store/ui-slice";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <ProductStoreScreen /> },
      { path: "/create-product", Component: () => <CreateProductScreen /> },
      { path: "/product/:productId", Component: () => <CreateProductScreen /> },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getProducts = async () => {
      try {
        dispatch(
          uiActions.changeStatus({
            isLoading: true,
          })
        );
        await dispatch(fetchProducts());
      } catch (error) {
        console.log("error", error.message);
      } finally {
        dispatch(
          uiActions.changeStatus({
            isLoading: false,
          })
        );
      }
    };
    getProducts();
  }, [dispatch]);

  return (
    <ToastProvider
      autoDismiss
      autoDismissTimeout={6000}
      placement="bottom-center"
    >
      <RouterProvider router={router} />;
    </ToastProvider>
  );
}

export default App;
