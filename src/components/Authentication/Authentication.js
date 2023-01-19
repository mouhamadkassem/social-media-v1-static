import React, { useState } from "react";
import authImage from "../../img/auth.jpg";
import "./Authentication.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  userRegisterAction,
  userLoginAction,
} from "../../redux/slices/User/User";
import { Navigate } from "react-router-dom";
import { AiFillCloseCircle } from "react-icons/ai";

const formSchema = Yup.object({
  firstName: Yup.string().required("the firstName is required"),
  lastName: Yup.string().required("the lastName is required"),
});

const Authentication = () => {
  const [login, setLogin] = useState(true);
  const [showModel, setShowModel] = useState(false);

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      firstName: "none",
      lastName: "none",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      if (login) {
        dispatch(userLoginAction(values));
      } else {
        dispatch(userRegisterAction(values));
      }
    },
    validationSchema: formSchema,
  });

  const handleModel = () => {
    setShowModel(false);
  };

  const { userAuth } = useSelector((state) => state?.user);

  if (userAuth) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="AuthPage">
      <img src={authImage} alt="enjoy" />
      <div className="btn-auth">
        <button
          className="login-btn btn"
          onClick={() => {
            setLogin(true);
            setShowModel(true);
          }}
        >
          Login
        </button>
        <button
          className="register-btn btn"
          onClick={() => {
            setLogin(false);
            setShowModel(true);
          }}
        >
          Register
        </button>
      </div>
      {showModel && (
        <div className="form">
          <div className="handle-form">
            <div className="showModel" onClick={handleModel}>
              <AiFillCloseCircle size={20} />
            </div>
            <h2>{login ? "Login In Your Account" : "Create Account"}</h2>
            <form className="auth-form" onSubmit={formik.handleSubmit}>
              {!login && (
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
              )}
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
                {login ? "Login" : "Register"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Authentication;
