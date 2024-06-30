import React, { useState } from "react";
import "./Authentication.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { userRegisterAction } from "../../redux/slices/User/User";
import { AiFillCloseCircle } from "react-icons/ai";
import "./Authentication.css";
import Button from "../../components/Button/Button";
import Form from "../../components/Form/Form";
import Input from "../../components/Input/Input";

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

  const { loading, isRegister, appErrRegister } = useSelector(
    (state) => state?.user
  );

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      if (values.password.length <= 7) {
        console.log("submited");
        setPasswordLength(true);
        setWhiteSpace(false);
      } else if (values.password.split(" ").length >= 2) {
        setPasswordLength(false);
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
    <Form
      onClick={() => setShowModel(false)}
      onSubmit={formik.handleSubmit}
      title="Create Account"
    >
      {appErrRegister ? <div className="error">{appErrRegister}</div> : null}
      <Input
        type="firstName"
        name="firstName"
        id="firstName"
        placeholder="FirstName"
        label="FirstName"
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
        type="lastName"
        name="lastName"
        id="lastName"
        placeholder="LastName"
        label="LastName"
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
      <>
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
              : passwordLength
              ? "password will be 8 characte"
              : whiteSpace
              ? "password can not contain spaces"
              : null
          }
        />
      </>
      {loading ? <Button loading /> : <Button text="Register" type="submit" />}
    </Form>
  );
};

export default Authentication;
