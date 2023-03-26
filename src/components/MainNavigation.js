import React from "react";
import {Link} from "react-router-dom"
import "./style.css"

export default function MainNavigation() {
  return (
    <header>
      <ul>
        <li>
            <Link to="/">Home</Link>
          {/* <a href="#home">Home</a> */}
        </li>
        <li>
            <Link to="/create-product">Create Product</Link>
          {/* <a href="#news">News</a> */}
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
        {/* <li style="float:right">
          <a class="active" href="#about">
            About
          </a>
        </li> */}
      </ul>
    </header>
  );
}
