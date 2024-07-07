import React from "react";
import "./Category.css";
import Button from "../../../components/Button/Button";

const Category = ({
  setShowForm,
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <div className="Category">
      <div
        className={`category-item ${
          selectedCategory === "All" ? "selectedType" : ""
        }`}
        onClick={() => {
          setSelectedCategory("All");
        }}
      >
        All
      </div>
      {categories?.map((type, index) => (
        <div
          className={`category-item ${
            selectedCategory === type ? "selectedType" : ""
          }`}
          key={index}
          onClick={() => {
            setSelectedCategory(type);
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
