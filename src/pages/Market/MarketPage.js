import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import ProductForm from "./ProductFrom/ProductForm";
import "./MarketPage.css";
import Category from "./Category/Category";
import ProductLists from "./ProductLists/ProductLists";
import LoadingMarket from "../../components/Loading/LoadingMarket";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductAction } from "../../redux/slices/Market/Market";

const MarketPage = () => {
  const [showForm, setShowForm] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProductAction());
  }, [dispatch]);

  const { loading, appErr, serverErr, products } = useSelector(
    (state) => state.market
  );

  return (
    <>
      <Navbar />
      <div className="MarketPage">
        <Category setShowForm={setShowForm} />

        {loading && !products ? <LoadingMarket /> : <ProductLists />}

        {showForm ? <ProductForm setShowForm={setShowForm} /> : <></>}
      </div>
    </>
  );
};

export default MarketPage;
