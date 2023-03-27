import "./style.css";
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  setSearchedProducts,
} from "../../store/products-action";
import { productsActions } from "../../store/products-slice";
import { useToasts } from "react-toast-notifications";
import { uiActions } from "../../store/ui-slice";

export default function ProductStoreScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentProducts, setCurrentProducts] = useState([]);

  const productStoreIsLoading = useSelector(
    (state) => state.ui.ProductStoreScreen.isLoading
  );
  const productsList = useSelector((state) => state.products.products);
  const searchedProducts = useSelector(
    (state) => state.products.searchedProducts
  );

  const debounce = useCallback((callback, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        callback(...args);
      }, delay);
    };
  }, []);

  const removeHandler = async (productId) => {
    try {
      await dispatch(deleteProduct(productId));
      addToast("Product Removed", {
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

  useEffect(() => {
    if (searchTerm) {
      dispatch(
        uiActions.changeStatus({
          isLoading: true,
        })
      );
      const debouncedSearch = debounce(async () => {
        try {
          await dispatch(setSearchedProducts(searchTerm));
        } catch (error) {
          addToast("Something Went Wrong", {
            appearance: "error",
            autoDismiss: true,
          });
        } finally {
          dispatch(
            uiActions.changeStatus({
              isLoading: false,
            })
          );
        }
      }, 500); // debounce delay in milliseconds
      debouncedSearch();
    } else {
      dispatch(productsActions.setSearchedProducts({ products: [] }));
    }
  }, [searchTerm, debounce, addToast, dispatch]);

  const changeHandler = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  useEffect(() => {
    setCurrentProducts(searchTerm ? searchedProducts : productsList);
  }, [searchTerm, searchedProducts, productsList]);

  const filterProducts = (event) => {
    const value = event.target.value;
    switch (value) {
      case "reccomend":
        setCurrentProducts(searchTerm ? searchedProducts : productsList);
        break;
      case "Price: Low to High":
        const lowToHighPrice = [...currentProducts];
        lowToHighPrice.sort((a, b) => a.price - b.price);
        setCurrentProducts(lowToHighPrice);
        break;
      case "Price: High to Low":
        const highToLowPrice = [...currentProducts];
        highToLowPrice.sort((a, b) => b.price - a.price);
        setCurrentProducts(highToLowPrice);
        break;
      case "Rating: Low to High":
        const highToLowRating = [...currentProducts];
        highToLowRating.sort((a, b) => a.rating - b.rating);
        setCurrentProducts(highToLowRating);
        break;
      case "Rating: High to Low":
        const lowToHighRating = [...currentProducts];
        lowToHighRating.sort((a, b) => b.rating - a.rating);
        setCurrentProducts(lowToHighRating);
        break;

      default:
        break;
    }
  };

  return (
    <div className="App">
      <header>
        <div className="header-actions">
          <div className="header-filter">
            <select name="products" id="products" onChange={filterProducts}>
              <optgroup label="Our Reccomendations">
                <option value="reccomend">Reccomend</option>
              </optgroup>
              <optgroup label="Price">
                <option value="Price: Low to High">Low to High</option>
                <option value="Price: High to Low">High to Low</option>
              </optgroup>
              <optgroup label="Rating">
                <option value="Rating: Low to High">Low to High</option>
                <option value="Rating: High to Low">High to Low</option>
              </optgroup>
            </select>
          </div>
          <div className="header-search">
            <input
              type="text"
              style={{ textAlign: "center" }}
              placeholder="Search products..."
              value={searchTerm}
              onChange={changeHandler}
            />
          </div>
        </div>
      </header>
      {productStoreIsLoading ? (
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
                <th>Price </th>
                <th>Photo</th>
                <th>Rating</th>
                <th>Stock</th>
                <th>Category</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product) => (
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
                      onClick={() => removeHandler(product.id)}
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
