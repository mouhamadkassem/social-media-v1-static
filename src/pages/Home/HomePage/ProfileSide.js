import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./ProfileSide.css";
import Profileimg from "../../../assets/img/download.jfif";
import { useDispatch, useSelector } from "react-redux";
import { userdetailsAction } from "../../../redux/slices/User/User";
import Button from "../../../components/Button/Button";

const ProfileSide = ({ handleShowLayout }) => {
  const dispatch = useDispatch();
  const userAuth = JSON.parse(localStorage.getItem("user-auth"));

  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  useEffect(() => {
    dispatch(userdetailsAction(userAuth?._id));
    // dispatch(fetchProductAction());
  }, [dispatch]);

  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  const { userLoginDetails } = useSelector((state) => state?.user);

  return (
    <div className="ProfileSide">
      {handleShowLayout ? (
        <div className="toggleLayout">
          <Button text="Following List" onClick={handleShowLayout} />
        </div>
      ) : (
        <></>
      )}
      <div className="profile-home">
        <Link to={`/profile/${userAuth?.id}`}>
          <img src={userLoginDetails?.profilePhoto} alt="" />{" "}
        </Link>
        <h3>
          {userLoginDetails?.firstName} {userLoginDetails?.lastName}
        </h3>
      </div>

      <div>
        <div className="New-friend">
          <Link to="/auth">
            <Button text="Add Friends"></Button>
          </Link>
        </div>
      </div>
      <div className="friend-list">
        <div className="friend-home">
          <div>
            <img src={Profileimg} alt="" />
          </div>
          <div>
            <h4>friend Name</h4>
          </div>
        </div>
        <div className="friend-home">
          <div>
            <img src={Profileimg} alt="" />
          </div>
          <div>
            <h4>friend Name</h4>
          </div>
        </div>
        <div className="friend-home">
          <div>
            <img src={Profileimg} alt="" />
          </div>
          <div>
            <h4>friend Name</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSide;
