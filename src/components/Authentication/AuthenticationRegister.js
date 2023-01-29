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
  const [passwordLength, setPasswordLength] = useState(false);
  const [whiteSpace, setWhiteSpace] = useState(false);
  const dispatch = useDispatch();

  const { loading, isRegister } = useSelector((state) => state?.user);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      if (values.password.length <= 7) {
        setPasswordLength(true);
      } else if (values.password.split(" ").length >= 2) {
        setWhiteSpace(true);
      } else {
        dispatch(userRegisterAction(values));
        setPasswordLength(false);
        setWhiteSpace(false);
      }
    },
    validationSchema: formSchema,
  });

  if (isRegister) {
    setLogin(true);
  }

  return (
    <form className="auth-form" onSubmit={formik.handleSubmit}>
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
        {formik.touched.firstName && formik.errors.firstName ? (
          <div className="error">{formik.errors.firstName}</div>
        ) : null}
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
        {formik.touched.lastName && formik.errors.lastName ? (
          <div className="error">{formik.errors.lastName}</div>
        ) : null}
      </div>

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
        {passwordLength ? (
          <div className="error">password will be 8 character</div>
        ) : null}
        {whiteSpace ? (
          <div className="error">password can not contain spaces</div>
        ) : null}
      </div>
      {loading ? (
        <button disabled type="submit" className="submit-fbtn btn">
          loading...
        </button>
      ) : (
        <button type="submit" className="submit-fbtn btn">
          Register
        </button>
      )}
    </form>
  );
};

export default Authentication;
