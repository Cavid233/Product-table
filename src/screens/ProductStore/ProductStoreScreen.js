import "./style.css";
import React, { useState, useEffect, useCallback } from "react";
import {Link} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, fetchProducts } from "../../store/products-action";
// import { fetchProducts } from "../../store/actions/products-action";



export default function ProductStoreScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const dispatch = useDispatch();
  const productsList = useSelector((state) => state.products.products);
  console.log("productsList", productsList);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <div className="App">
      <header>
        {/* <div class="header-title">
          <h1>Product Store</h1>
        </div> */}
        <div class="header-actions">
          <div class="header-search">
            <input type="text" placeholder="Search products..." />
            <button>Search</button>
          </div>
          <div class="header-create">
            <Link to="/create-product">
              <button>Create New Product</button>
            </Link>
          </div>
        </div>
      </header>
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
            {productsList.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>{product.description}</td>
                <td>${product.price}</td>
                <td>
                  <img src={product.images[0]} alt="Product 2" />
                </td>
                <td>{product.rating}</td>
                <td>{product.stock}</td>
                <td>{product.category}</td>
                <td>
                  <button className="update">Update</button>
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
    </div>
  );
}
