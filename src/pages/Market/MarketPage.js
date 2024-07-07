import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import ProductForm from "./ProductFrom/ProductForm";
import "./MarketPage.css";
import Category from "./Category/Category";
import ProductLists from "./ProductLists/ProductLists";
import LoadingMarket from "../../components/Loading/LoadingMarket";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductAction } from "../../redux/slices/Market/Market";

const category = ["Cars", "Electronics", "Mobile", "Sports", "Services"];

const MarketPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProductAction());
  }, [dispatch]);

  const { loading, products } = useSelector((state) => state.market);

  return (
    <>
      <Navbar />
      <div className="MarketPage">
        <Category
          setShowForm={setShowForm}
          categories={category}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {loading && !products ? (
          <LoadingMarket />
        ) : (
          <ProductLists selectedCategory={selectedCategory} />
        )}

        {showForm ? <ProductForm setShowForm={setShowForm} /> : <></>}
      </div>
    </>
  );
};

export default MarketPage;
