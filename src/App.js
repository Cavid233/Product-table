import React, { useEffect } from "react";

import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import ProductStoreScreen from "./screens/ProductStore/ProductStoreScreen";
import CreateProductScreen from "./screens/CreateProduct/CreateProductScreen";
import RootLayout from "./screens/Root/Root";
import ErrorPage from "./screens/Error/Error";
import ProductDetailsScreen from "./screens/ProductDetails/ProductDetailsScreen";
import { useDispatch } from "react-redux";
import { fetchProducts } from "./store/products-action";
// const routeDefinitions = createRoutesFromElements(
//   <Route>
//     <Route path="/" element={<ProductStoreScreen />} />
//     <Route path="/create-product" element={<CreateProductScreen />} />
//   </Route>
// )

// const router = createBrowserRouter(routeDefinitions);

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <ProductStoreScreen /> },
      { path: "/create-product", element: <CreateProductScreen /> },
      { path: "/product/:productId", element: <CreateProductScreen /> },
    ],
  },
  // {path: '/', element: <ProductStoreScreen />},
  // {path: '/create-product', element: <CreateProductScreen />},
]);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getProducts = async () => {
      try {
        // setIsLoading(true);
        await dispatch(fetchProducts());
      } catch (error) {
        console.log("error", error.message);
      } finally {
        // setIsLoading(false);
      }
    };
    getProducts();
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
