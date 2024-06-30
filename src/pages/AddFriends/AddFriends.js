import React, { useEffect, useState } from "react";
import "./AddFriends.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { BiSearchAlt } from "react-icons/bi";
import { fetchAllUsersAction } from "../../redux/slices/User/User";
import Button from "../../components/Button/Button";

const AddFriends = () => {
  const [userToSearch, setUsertoSearch] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUsersAction());
  }, []);

  const { usersToAuth, userLoginDetails } = useSelector((state) => state?.user);

  const usersList = usersToAuth?.filter(
    (user) => user?._id !== userLoginDetails?._id
  );

  return (
    <>
      <Navbar />

      <div className="AddFriends">
        <div className="toSearch">
          <input
            id="addFriend"
            type="text"
            placeholder="Find Friend..."
            value={userToSearch}
            onChange={(e) => {
              setUsertoSearch(e.target.value);
            }}
          />
          <label className="SearchLabel" htmlFor="addFriend">
            <BiSearchAlt />
          </label>
        </div>
        {userToSearch &&
          usersList
            ?.filter(
              (user) =>
                user?.firstName
                  ?.toLowerCase()
                  .includes(userToSearch.toLowerCase()) ||
                user?.lastName
                  ?.toLowerCase()
                  .includes(userToSearch.toLowerCase())
            )
            .map((user) => (
              <>
                {userLoginDetails?.following?.find(
                  (follow) => follow._id === user?._id
                ) ? null : (
                  <div className="Add-Friend">
                    <div className="add-info-sec">
                      <div className="add-info-img">
                        <img src={user?.profilePhoto} alt="" />
                      </div>
                      <div className="add-info">
                        <h3>
                          {user?.firstName} {user?.lastName}
                        </h3>
                      </div>
                    </div>
                    <div className="pro-btn">
                      <Link to={`/profile/${user?._id}`}>
                        <Button text="Profile" className="message-btn" />
                      </Link>
                    </div>
                  </div>
                )}
              </>
            ))}
      </div>
    </>
  );
};

export default AddFriends;
