import "./style.css";
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  setSearchedProducts,
} from "../../store/products-action";
import { productsActions } from "../../store/products-slice";


export default function ProductStoreScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const productsList = useSelector((state) => state.products.products);
  const searchedProducts = useSelector((state) => state.products.searchedProducts);

  const debounce = useCallback((callback, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        callback(...args);
      }, delay);
    };
  }, []);


  useEffect(() => {
    if (searchTerm) {
      console.log("searchterm is here")
      setIsLoading(true);
      const debouncedSearch = debounce(async () => {
        await dispatch(setSearchedProducts(searchTerm));
        setIsLoading(false);
      }, 500); // debounce delay in milliseconds
      debouncedSearch();
    }else {
      console.log("I am here man")
      dispatch(
        productsActions.setSearchedProducts({ products: [] })
      );
    }
  }, [searchTerm, debounce, dispatch]);

  const navigateToCreateProductForm = () => {
    navigate("/create-product");
  };

  const changeHandler = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  return (
    <div className="App">
      <header>
        
        <div className="header-actions">
          <div className="header-search">
            <input
              type="text"
              style={{ textAlign: "center" }}
              placeholder="Search products..."
              value={searchTerm}
              onChange={changeHandler}
            />
          </div>
          <div className="header-create">
            <button onClick={navigateToCreateProductForm}>
              Create New Product
            </button>
          </div>
        </div>
      </header>
      {isLoading ? (
        <div
          style={{
            marginTop: "200px",
            textAlign: "center",
          }}
        >
          Loading ....
        </div>
      ) : (
        <div className="product-list">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Photo</th>
                <th>Rating</th>
                <th>Stock</th>
                <th>Category</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {(searchTerm ? searchedProducts : productsList).map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.title}</td>
                  <td>{product.description}</td>
                  <td>${product.price}</td>
                  <td>
                    <img src={product.images?.[0]} alt="Product 2" />
                  </td>
                  <td>{product.rating}</td>
                  <td>{product.stock}</td>
                  <td>{product.category}</td>
                  <td>
                    <button
                      className="update"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      className="remove"
                      onClick={() => dispatch(deleteProduct(product.id))}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
