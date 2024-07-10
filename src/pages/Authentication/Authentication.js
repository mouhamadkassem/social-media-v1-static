import React, { useCallback, useState } from "react";
import "./Authentication.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { userLoginAction } from "../../redux/slices/User/User";
import { Navigate } from "react-router-dom";
import AuthenticationRegister from "./AuthenticationRegister";
import Button from "../../components/Button/Button";
import Form from "../../components/Form/Form";
import Input from "../../components/Input/Input";

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

  const handleModel = useCallback(() => {
    setShowModel(false);
  }, [showModel]);

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
        <>
          {login ? (
            <Form
              onClick={handleModel}
              title="Login In Your Account"
              onSubmit={formik.handleSubmit}
            >
              {login ? (
                <>{appErr ? <div className="error">{appErr}</div> : null}</>
              ) : (
                <></>
              )}
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                label="Email"
                fullWidth
                value={formik.values.email}
                onChange={formik.handleChange("email")}
                onBlur={formik.handleBlur("email")}
                error={
                  formik.errors.email && formik.touched.email
                    ? formik.errors?.email
                    : null
                }
              />
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                label="Password"
                fullWidth
                value={formik.values.password}
                onChange={formik.handleChange("password")}
                onBlur={formik.handleBlur("password")}
                error={
                  formik.errors.password && formik.touched.password
                    ? formik.errors?.password
                    : null
                }
              />
              {loading ? (
                <Button loading />
              ) : (
                <Button type="submit" text="Login" />
              )}
            </Form>
          ) : (
            <AuthenticationRegister
              setLogin={setLogin}
              showModel={showModel}
              setShowModel={setShowModel}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Authentication;
