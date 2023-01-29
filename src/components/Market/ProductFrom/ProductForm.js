import React, { useState } from "react";
import "./ProductForm.css";
import Dropzone from "react-dropzone";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import Select from "react-select";
import { addProductAction } from "../../../redux/slices/Market/Market";
import { AiFillCloseCircle } from "react-icons/ai";

const formSchema = Yup.object({
  title: Yup.string().required("title is required"),
  desc: Yup.string().required("desc is required"),
  price: Yup.string().required("price is required"),
});

const category = [
  { value: "Mix", label: "Mix" },
  { value: "Cars", label: "Cars" },
  { value: "Electronics", label: "Electronics" },
  { value: "Mobile", label: "Mobile" },
  { value: "Sports", label: "Sports" },
  { value: "Services", label: "Services" },
];
const condition = [
  { value: "New", label: "New" },
  { value: "Used", label: "Used" },
];
const ProductForm = ({ setShowForm }) => {
  const [selectedCondition, setSelectedCondition] = useState({ value: "New" });
  const [selectedCategory, setSelectedCategory] = useState({ value: "Mix" });
  const [images, setImages] = useState([]);
  const [imageRequired, setImageRequired] = useState(false);

  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      images: "",
      title: "",
      desc: "",
      price: "",
      phoneNum: "",
    },
    onSubmit: (values) => {
      if (images.length === 0) {
        setImageRequired(true);
      } else {
        const data = {
          ...values,
          category: selectedCategory.value,
          condition: selectedCondition.value,
          images: images,
        };

        dispatch(addProductAction(data));
        setShowForm(false);
        setImageRequired(false);
      }
    },
    validationSchema: formSchema,
  });
  return (
    <div className="ProductForm">
      <div className="addProductForm">
        <h2>Add Product</h2>
        <div className="toClose" onClick={() => setShowForm(false)}>
          <AiFillCloseCircle size={20} />
        </div>
        <form className="product-form" onSubmit={formik.handleSubmit}>
          <div className="product-input">
            <Dropzone
              onDrop={(acceptedFiles) => setImages(acceptedFiles)}
              accept="image/png image/jpeg"
              onBlur={formik.handleBlur("image")}
            >
              {({ getRootProps, getInputProps }) => (
                <div className="container">
                  <div
                    {...getRootProps({
                      className: "dropzone",
                      onDrop: (event) => event.stopPropagation(),
                    })}
                  >
                    <input {...getInputProps()} />
                    <p>+ Add the image here</p>
                  </div>
                </div>
              )}
            </Dropzone>
            {imageRequired ? (
              <div className="error">iamges is required</div>
            ) : null}
          </div>

          <div className="product-input">
            <label>Tilte</label>
            <input
              type="text"
              placeholder="Title"
              value={formik.values.title}
              onChange={formik.handleChange("title")}
              onBlur={formik.handleBlur("title")}
            />
            {formik.touched.title && formik.errors.title ? (
              <div className="error">{formik.errors.title}</div>
            ) : null}
          </div>
          <div className="product-input">
            <Select
              defaultValue={null}
              onChange={setSelectedCategory}
              options={category}
              placeholder="category default Mix..."
            />
          </div>
          <div className="product-input">
            <label>Description</label>
            <input
              type="text"
              placeholder="Description"
              value={formik.values.desc}
              onChange={formik.handleChange("desc")}
              onBlur={formik.handleBlur("desc")}
            />
            {formik.touched.desc && formik.errors.desc ? (
              <div className="error">{formik.errors.desc}</div>
            ) : null}
          </div>
          <div className="product-input">
            <label>Price</label>
            <input
              type="number"
              placeholder="Price $"
              max="100"
              value={formik.values.price}
              onChange={formik.handleChange("price")}
              onBlur={formik.handleBlur("price")}
            />
            {formik.touched.price && formik.errors.price ? (
              <div className="error">{formik.errors.price}</div>
            ) : null}
          </div>
          <div className="product-input">
            <label>Phone Number</label>
            <input
              type="number"
              placeholder="Phone Number"
              value={formik.values.phoneNum}
              onChange={formik.handleChange("phoneNum")}
              onBlur={formik.handleBlur("phoneNum")}
            />
          </div>

          <div className="product-input">
            <Select
              defaultValue={null}
              onChange={setSelectedCondition}
              options={condition}
              placeholder="condition default New..."
            />
          </div>
          <div className="product-input btn-product">
            <input type="submit" value="Add Product" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
