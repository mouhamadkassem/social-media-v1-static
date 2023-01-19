import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addRatingAction,
  deleteProductAction,
  productDetailsAction,
  productViewedAction,
} from "../../../redux/slices/Market/Market";
import Navbar from "../../Navbar/Navbar";
import "./ProductDetails.css";
import { AiFillStar } from "react-icons/ai";
import { Link, Navigate, useParams } from "react-router-dom";
import LoadingProdDetails from "../../Loading/LoadingProdDetails";

const ProductDetails = () => {
  const [range, setRange] = useState(1);
  const { id } = useParams();
  const dispatch = useDispatch();

  const { productDetails, rating, loading, productDeleted } = useSelector(
    (state) => state?.market
  );

  const { userLoginDetails } = useSelector((state) => state?.user);

  const isMyProduct = productDetails?.user?._id === userLoginDetails?._id;

  const isUserRating = productDetails?.isRated?.find(
    (user) => user.toString() === userLoginDetails?._id
  );

  const addRating = () => {
    const data = {
      newRating: range,
      id,
    };
    dispatch(addRatingAction(data));
  };

  useEffect(() => {
    dispatch(productViewedAction(id));
    dispatch(productDetailsAction(id));
  }, [dispatch, rating]);

  if (productDeleted) {
    return <Navigate to={"/market"} />;
  }

  return (
    <>
      <Navbar />
      {loading && !productDetails ? (
        <LoadingProdDetails />
      ) : (
        <div className="ProductDetails">
          <div className="img-side">
            <div className="imgs">
              {productDetails?.imgs?.map((img, index) => (
                <img
                  src={img}
                  alt=""
                  className="product-img-details"
                  key={index}
                />
              ))}
            </div>
            <h2>{productDetails?.title}</h2>
          </div>
          <div className="info-details">
            <div className="user-info">
              <Link to={`/profile/${productDetails?.user?._id}`}>
                <img
                  src={productDetails?.user?.profilePhoto}
                  alt=""
                  className="product-img-user"
                />
              </Link>

              <h3>
                {productDetails?.user?.firstName}{" "}
                {productDetails?.user?.lastName}
              </h3>
              {isMyProduct ? null : (
                <Link to={`/chat/${productDetails?.user?._id}`}>
                  <button className="product-message">Message</button>
                </Link>
              )}
            </div>
            <p>{productDetails?.desc}</p>
            <div className="details-product">
              <div>Category: {productDetails?.category}</div>
              <div>Price: {productDetails?.price}$</div>
              <div>Phone Number: {productDetails?.phoneNum}</div>
              <div className="details-rating">
                rating: {!productDetails?.rating ? 0 : productDetails?.rating}{" "}
                <AiFillStar className="icon-star" />
                <span>({productDetails?.isRated?.length})</span>
              </div>
              <div>condition: {productDetails?.condition}</div>
              <div>views: {productDetails?.views?.length}</div>
            </div>
            {isMyProduct ? (
              <button
                className="block-btn deleteProduct"
                onClick={() => {
                  dispatch(deleteProductAction(id));
                }}
              >
                delete
              </button>
            ) : isUserRating ? (
              <h4>Thanks for sharing your rating...</h4>
            ) : (
              <>
                {loading ? (
                  <button className="btn-addRating loading-rate" disabled>
                    loading...
                  </button>
                ) : (
                  <>
                    <button className="btn-addRating" onClick={addRating}>
                      add Rating
                    </button>
                    <div>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        step="1"
                        value={range}
                        onChange={(e) => setRange(e.target.value)}
                        color="blue"
                      />
                      <span className="range">
                        {range}
                        <AiFillStar />
                      </span>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
