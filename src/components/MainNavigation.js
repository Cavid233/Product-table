import React from "react";
import { NavLink } from "react-router-dom";
import "./style.css";

export default function MainNavigation() {
  return (
    <header>
      <div className="header-title">
        <h1>Product Store</h1>
      </div>
      <ul>
        <li>
          {/* <Link to="/">Home</Link> */}
          <NavLink
            to="/"
            className={({ isActive }) => isActive && "active-link"}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/create-product"
            className={({ isActive }) => isActive && "active-link"}
          >
            Create Product
          </NavLink>
        </li>
      </ul>
    </header>
  );
}
