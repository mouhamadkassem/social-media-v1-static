import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./FollowingList.css";
import { BsFillPersonLinesFill, BsFillChatDotsFill } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import Button from "../../../components/Button/Button";

const FollowingList = ({ handleShowLayout }) => {
  const [userToSearch, setUserToSearch] = useState("");
  const { userLoginDetails } = useSelector((state) => state?.user);

  return (
    <div className="FollowingList">
      {handleShowLayout ? (
        <div className="toggleLayout">
          <Button text="Profile Post" onClick={handleShowLayout} />
        </div>
      ) : (
        <></>
      )}

      {userLoginDetails?.following?.length <= 0 ? (
        <div className="noFollowing">
          <p>you are not following any user yet</p>
          <Link to="/auth" className="toFollow">
            {" "}
            Follow
          </Link>
        </div>
      ) : (
        <div className="rightSide">
          <div className="toSearch">
            <input
              id="addFriend"
              type="text"
              placeholder="Filter..."
              value={userToSearch}
              onChange={(e) => setUserToSearch(e.target.value)}
            />
            <label className="SearchLabel" htmlFor="addFriend">
              <BiSearchAlt />
            </label>
          </div>
          {userLoginDetails?.following
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
              <div key={user?._id} className="friends">
                <div className="friend">
                  <img src={user?.profilePhoto} alt="" />
                  <h4>
                    {user?.firstName} {user?.lastName}
                  </h4>
                </div>
                <div className="friend-action">
                  <Link to={`/profile/${user?._id}`} className="friend-link">
                    <BsFillPersonLinesFill />
                  </Link>

                  <Link to={`/chat/${user?._id}`} className="friend-link">
                    <BsFillChatDotsFill />
                  </Link>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default FollowingList;
