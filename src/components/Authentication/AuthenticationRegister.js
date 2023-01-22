import React, { useState } from "react";
import "./Authentication.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { userRegisterAction } from "../../redux/slices/User/User";
import { AiFillCloseCircle } from "react-icons/ai";
import "./Authentication.css";

const formSchema = Yup.object({
  firstName: Yup.string().required("the firstName is required"),
  lastName: Yup.string().required("the lastName is required"),
  email: Yup.string().required("the email is required"),
  password: Yup.string().required("the password is required"),
});

const Authentication = ({ setLogin, showModel, setShowModel }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log("clicked");
      dispatch(userRegisterAction(values));
      setLogin(true);
    },
    validationSchema: formSchema,
  });

  const { loading } = useSelector((state) => state?.user);

  return (
    <form className="auth-form" onSubmit={formik.handleSubmit}>
      <>
        <div className="auth-input">
          <label htmlFor="FirstName">First Name</label>
          <input
            value={formik.values.firstName}
            onChange={formik.handleChange("firstName")}
            onBlur={formik.handleBlur("firstName")}
            type="text"
            name="FirstName"
            id="FirstName"
            placeholder="First Name"
          />
        </div>
        <div className="auth-input">
          <label htmlFor="LastName">Last Name</label>
          <input
            value={formik.values.lastName}
            onChange={formik.handleChange("lastName")}
            onBlur={formik.handleBlur("lastName")}
            type="text"
            name="LastName"
            id="LastName"
            placeholder="Last Name"
          />
        </div>
      </>
      <div className="auth-input">
        <label htmlFor="email">Email</label>
        <input
          value={formik.values.email}
          onChange={formik.handleChange("email")}
          onBlur={formik.handleBlur("email")}
          type="email"
          name="email"
          id="email"
          placeholder="Email"
        />
      </div>
      <div className="auth-input">
        <label htmlFor="Password">Password</label>
        <input
          value={formik.values.password}
          onChange={formik.handleChange("password")}
          onBlur={formik.handleBlur("password")}
          type="Password"
          name="Password"
          id="Password"
          placeholder="Password"
        />
      </div>

      <button type="submit" className="submit-fbtn btn">
        Register
      </button>
    </form>
  );
};

export default Authentication;
