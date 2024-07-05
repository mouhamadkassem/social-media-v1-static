import React from "react";
import "./ProductLists.css";
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { useSelector } from "react-redux";

const ProductLists = () => {
  const { products } = useSelector((state) => state?.market);

  const category = products?.map((product) => product?.category);

  return (
    <div className="ProductLists">
      {category
        ?.filter((item, index) => category.indexOf(item) === index)
        ?.filter(Boolean)
        ?.map((section, index) => (
          <div key={index} className="section">
            <h1 className="Product-category">{section}</h1>
            <div className="items">
              {products?.map((product, index) => (
                <>
                  {section === product?.category ? (
                    <div className="item" key={index}>
                      <Link
                        to={`/product/${product?._id}`}
                        className="productLink"
                      >
                        <img src={product?.imgs[0]} alt="" />
                      </Link>
                      <h3>{product?.title}</h3>
                      <p>
                        {product?.user?.firstName} {product?.user?.lastName}
                      </p>
                      <h3>{product?.price}$</h3>
                      <div className="rating">
                        {product?.rating}
                        <div>
                          <AiFillStar size={20} />
                        </div>{" "}
                        <span>({product?.views?.length})</span>
                      </div>
                    </div>
                  ) : null}
                </>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default ProductLists;
