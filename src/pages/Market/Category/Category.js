import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  categoryProductAction,
  fetchProductAction,
} from "../../../redux/slices/Market/Market";
import "./Category.css";
import Button from "../../../components/Button/Button";

const category = ["Mix", "Cars", "Electronics", "Mobile", "Sports", "Services"];

const Category = ({ setShowForm }) => {
  const dispatch = useDispatch();

  return (
    <div className="Category">
      <div
        className="category-item"
        onClick={() => {
          dispatch(fetchProductAction());
        }}
      >
        All
      </div>
      {category.map((type, index) => (
        <div
          className="category-item"
          key={index}
          onClick={() => {
            dispatch(categoryProductAction(type));
          }}
        >
          {type}
        </div>
      ))}
      <div className="addProduct">
        <Button text="Add Product" onClick={() => setShowForm(true)} />
      </div>
    </div>
  );
};

export default Category;
