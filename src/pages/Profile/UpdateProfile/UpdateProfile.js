import React, { useEffect } from "react";
import "./UpdateProfile.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import {
  updateProfileAction,
  fetchProfileDetailsCtrl,
} from "../../../redux/slices/User/User";
import Form from "../../../components/Form/Form";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";

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
      <Form
        title="Update Profile"
        onSubmit={formik.handleSubmit}
        onClick={() => {
          setUpdateProfile(false);
        }}
      >
        <Input
          type="text"
          name="firstName"
          id="firstName"
          placeholder="First Name"
          label="First Name"
          fullWidth
          value={formik.values.firstName}
          onChange={formik.handleChange("firstName")}
          onBlur={formik.handleBlur("firstName")}
          error={
            formik.errors.firstName && formik.touched.firstName
              ? formik.errors?.firstName
              : null
          }
        />

        <Input
          type="text"
          name="lastName"
          id="lastName"
          placeholder="Last Name"
          label="Last Name"
          fullWidth
          value={formik.values.lastName}
          onChange={formik.handleChange("lastName")}
          onBlur={formik.handleBlur("lastName")}
          error={
            formik.errors.lastName && formik.touched.lastName
              ? formik.errors?.lastName
              : null
          }
        />

        <Input
          type="text"
          name="bio"
          id="bio"
          placeholder="Write Your Bio"
          label="Bio"
          fullWidth
          value={formik.values.bio}
          onChange={formik.handleChange("bio")}
          onBlur={formik.handleBlur("bio")}
          error={
            formik.errors.bio && formik.touched.bio ? formik.errors?.bio : null
          }
        />
        <div className="btn-update-pro">
          <Button text="Update" type="submit" />
        </div>
      </Form>
    </div>
  );
};

export default UpdateProfile;
