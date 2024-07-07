import React, { useMemo } from "react";
import "./ProductLists.css";
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { useSelector } from "react-redux";

const ProductLists = ({ selectedCategory }) => {
  const { products } = useSelector((state) => state?.market);

  const productList = useMemo(() => {
    if (products) {
      if (selectedCategory == "All") return products;
      else
        return products?.filter(
          (product) => product?.category === selectedCategory
        );
    } else {
      return [];
    }
  }, [selectedCategory]);

  return (
    <div className="ProductLists">
      <div className="section">
        <h1 className="Product-category">{selectedCategory}</h1>
        <div className="items">
          {productList?.length > 0 ? (
            <>
              {productList?.map((product, index) => (
                <div className="item" key={index}>
                  <Link to={`/product/${product?._id}`} className="productLink">
                    <img src={product?.imgs[0]} alt="" />
                  </Link>
                  <h3>{product?.title}</h3>
                  <p>
                    {product?.user?.firstName} {product?.user?.lastName}
                  </p>
                  <h3>{product?.price}$</h3>
                  <div className="rating">
                    {product?.rating}
                    <AiFillStar size={20} />
                    <span>({product?.views?.length})</span>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="emptyCategory">
              Oops!! No added products match this category yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductLists;
