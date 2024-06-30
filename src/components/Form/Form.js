import React from "react";
import "./Form.css";
import { AiFillCloseCircle } from "react-icons/ai";

const Form = ({ children, title, onClick, onSubmit }) => {
  return (
    <div className="formContainer">
      <div className="showModel" onClick={onClick}>
        <AiFillCloseCircle size={20} />
      </div>
      <h3>{title}</h3>
      <form onSubmit={onSubmit}>{children}</form>
    </div>
  );
};

export default Form;
