import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  categoryProductAction,
  fetchProductAction,
} from "../../../redux/slices/Market/Market";
import "./Category.css";
import Button from "../../../components/Button/Button";

const category = ["Cars", "Electronics", "Mobile", "Sports", "Services"];

const Category = ({ setShowForm }) => {
  const [selectedType, setSelectedType] = useState("All");
  const dispatch = useDispatch();

  return (
    <div className="Category">
      <div
        className={`category-item ${
          selectedType === "All" ? "selectedType" : ""
        }`}
        onClick={() => {
          dispatch(fetchProductAction());
          setSelectedType("All");
        }}
      >
        All
      </div>
      {category.map((type, index) => (
        <div
          className={`category-item ${
            selectedType === type ? "selectedType" : ""
          }`}
          key={index}
          onClick={() => {
            dispatch(categoryProductAction(type));
            setSelectedType(type);
          }}
        >
          {type}
        </div>
      ))}
      <div className="addProductBtn">
        <Button text="Add Product" onClick={() => setShowForm(true)} />
      </div>
    </div>
  );
};

export default Category;
