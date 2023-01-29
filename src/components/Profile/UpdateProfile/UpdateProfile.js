import React, { useEffect } from "react";
import "./UpdateProfile.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import {
  updateProfileAction,
  fetchProfileDetailsCtrl,
} from "../../../redux/slices/User/User";
import { AiFillCloseCircle } from "react-icons/ai";

const formSchema = Yup.object({
  firstName: Yup.string().required("the First Name is required"),
  lastName: Yup.string().required("the Last Name is required"),
  bio: Yup.string().required("the bio is required"),
});

const UpdateProfile = ({ setUpdateProfile }) => {
  const dispatch = useDispatch();
  const { userLoginDetails, updatedProfile } = useSelector(
    (state) => state?.user
  );
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: userLoginDetails?.firstName,
      lastName: userLoginDetails?.lastName,
      bio: userLoginDetails?.bio,
    },
    onSubmit: (values) => {
      dispatch(updateProfileAction(values));
      setUpdateProfile(false);
      dispatch(fetchProfileDetailsCtrl(userLoginDetails?._id));
    },
    validationSchema: formSchema,
  });

  return (
    <div className="UpdateProfile">
      <div
        className="to-close-form"
        onClick={() => {
          setUpdateProfile(false);
        }}
      >
        <AiFillCloseCircle size={20} />
      </div>
      <h2>Update Profile</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="update-pro-input">
          <label
            style={{ marginTop: "10px", cursor: "pointer" }}
            htmlFor="firstName"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange("firstName")}
            onBlur={formik.handleBlur("firstName")}
            placeholder="First Name"
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <div className="error">{formik.errors.firstName}</div>
          ) : null}
        </div>
        <div className="update-pro-input">
          <label
            style={{ marginTop: "10px", cursor: "pointer" }}
            htmlFor="lastName"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange("lastName")}
            onBlur={formik.handleBlur("lastName")}
            placeholder="Last Name"
          />
          {formik.touched.lastName && formik.errors.lastName ? (
            <div className="error">{formik.errors.lastName}</div>
          ) : null}
        </div>

        <div className="update-pro-input">
          <label style={{ marginTop: "10px", cursor: "pointer" }} htmlFor="bio">
            bio
          </label>
          <input
            type="text"
            id="bio"
            value={formik.values.bio}
            onChange={formik.handleChange("bio")}
            onBlur={formik.handleBlur("bio")}
            placeholder="bio..."
          />
          {formik.touched.bio && formik.errors.bio ? (
            <div className="error">{formik.errors.bio}</div>
          ) : null}
        </div>
        <div className="btn-update-pro">
          <button type="submit">Update</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
