import React, { useState } from "react";
import "./Authentication.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { userLoginAction } from "../../redux/slices/User/User";
import { Navigate } from "react-router-dom";
import { AiFillCloseCircle } from "react-icons/ai";
import AuthenticationRegister from "./AuthenticationRegister";
import Button from "../../components/Button/Button";

const formSchema = Yup.object({
  email: Yup.string().required("email is required"),
  password: Yup.string().required("password is required"),
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
      dispatch(userLoginAction(values));
    },
    validationSchema: formSchema,
  });

  const handleModel = () => {
    setShowModel(false);
  };

  const { userAuth, loading, appErr, appErrRegister } = useSelector(
    (state) => state?.user
  );

  if (userAuth) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="AuthPage">
      <div className="btn-auth">
        <Button
          onClick={() => {
            setLogin(true);
            setShowModel(true);
          }}
          text="Login"
        />

        <Button
          onClick={() => {
            setLogin(false);
            setShowModel(true);
          }}
          text="Register"
        />
      </div>
      {showModel && (
        <div className="form">
          <div className="handle-form">
            <div className="showModel" onClick={handleModel}>
              <AiFillCloseCircle size={20} />
            </div>
            <h2>{login ? "Login In Your Account" : "Create Account"}</h2>

            {login ? (
              <>{appErr ? <div className="error">{appErr}</div> : null}</>
            ) : (
              <>
                {appErrRegister ? (
                  <div className="error">{appErrRegister}</div>
                ) : null}
              </>
            )}

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
                  {formik.touched.email && formik.errors.email ? (
                    <div className="error">{formik.errors.email}</div>
                  ) : null}
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
                  {formik.touched.password && formik.errors.password ? (
                    <div className="error">{formik.errors.password}</div>
                  ) : null}
                </div>
                {loading ? (
                  <Button loading />
                ) : (
                  <Button type="submit" text="Login" />
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
