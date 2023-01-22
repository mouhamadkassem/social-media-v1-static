import React, { useState } from "react";
import authImage from "../../img/auth.jpg";
import "./Authentication.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { userLoginAction } from "../../redux/slices/User/User";
import { Navigate } from "react-router-dom";
import { AiFillCloseCircle } from "react-icons/ai";
import AuthenticationRegister from "./AuthenticationRegister";

const formSchema = Yup.object({
  email: Yup.string().required("the email is required"),
  password: Yup.string().required("the password is required"),
});

const Authentication = () => {
  const [login, setLogin] = useState(true);
  const [showModel, setShowModel] = useState(false);

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log("clicked");
      dispatch(userLoginAction(values));
    },
    validationSchema: formSchema,
  });

  const handleModel = () => {
    setShowModel(false);
  };

  const { userAuth, loading } = useSelector((state) => state?.user);

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
            {login ? (
              <form className="auth-form" onSubmit={formik.handleSubmit}>
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
                {loading ? (
                  <button disabled className="submit-fbtn btn">
                    Loading...
                  </button>
                ) : (
                  <button type="submit" className="submit-fbtn btn">
                    Login
                  </button>
                )}
              </form>
            ) : (
              <AuthenticationRegister
                setLogin={setLogin}
                showModel={showModel}
                setShowModel={setShowModel}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Authentication;
