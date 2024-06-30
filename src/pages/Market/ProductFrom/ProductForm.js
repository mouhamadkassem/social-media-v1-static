import React, { useState } from "react";
import "./ProductForm.css";
import Dropzone from "react-dropzone";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import Select from "react-select";
import { addProductAction } from "../../../redux/slices/Market/Market";
import Button from "../../../components/Button/Button";
import Form from "../../../components/Form/Form";
import Input from "../../../components/Input/Input";

const formSchema = Yup.object({
  title: Yup.string().required("title is required"),
  desc: Yup.string().required("desc is required"),
  price: Yup.string().required("price is required"),
  phoneNum: Yup.string().required("price is required"),
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
      <Form
        title="Add Product"
        onSubmit={formik.handleSubmit}
        onClick={() => setShowForm(false)}
      >
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
                <p className="dropzoneInput">+ Add the image here</p>
              </div>
            </div>
          )}
        </Dropzone>
        {imageRequired ? <div className="error">iamges is required</div> : null}

        <Input
          type="text"
          name="title"
          id="title"
          placeholder="Title Of Product"
          label="Title"
          fullWidth
          value={formik.values.title}
          onChange={formik.handleChange("title")}
          onBlur={formik.handleBlur("title")}
          error={
            formik.errors.title && formik.touched.title
              ? formik.errors?.title
              : null
          }
        />
        <Select
          defaultValue={null}
          onChange={setSelectedCategory}
          options={category}
          placeholder="category default Mix..."
          className="selectInput"
        />

        <Input
          type="text"
          name="desc"
          id="desc"
          placeholder="Description"
          label="Description"
          fullWidth
          value={formik.values.desc}
          onChange={formik.handleChange("desc")}
          onBlur={formik.handleBlur("desc")}
          error={
            formik.errors.desc && formik.touched.desc
              ? formik.errors?.desc
              : null
          }
        />
        <Input
          type="number"
          name="price"
          id="price"
          placeholder="Price"
          label="Price"
          fullWidth
          value={formik.values.price}
          onChange={formik.handleChange("price")}
          onBlur={formik.handleBlur("price")}
          error={
            formik.errors.price && formik.touched.price
              ? formik.errors?.price
              : null
          }
        />
        <Input
          type="number"
          name="phoneNum"
          id="phoneNum"
          placeholder="Phone Number"
          label="Phone Number"
          fullWidth
          value={formik.values.phoneNum}
          onChange={formik.handleChange("phoneNum")}
          onBlur={formik.handleBlur("phoneNum")}
          error={
            formik.errors.phoneNum && formik.touched.phoneNum
              ? formik.errors?.phoneNum
              : null
          }
        />

        <Select
          defaultValue={null}
          onChange={setSelectedCondition}
          options={condition}
          placeholder="condition default New..."
          className="selectInput"
        />
        <Button type="submit" text="Add Product" />
      </Form>
    </div>
  );
};

export default ProductForm;
