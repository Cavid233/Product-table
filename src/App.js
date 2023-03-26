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
    ],
  },
  // {path: '/', element: <ProductStoreScreen />},
  // {path: '/create-product', element: <CreateProductScreen />},
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
