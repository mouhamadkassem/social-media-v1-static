import React from "react";
import "./AddPostForm.css";
import Dropzone from "react-dropzone";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createPostAction } from "../../redux/slices/Post/Post";
import { useDispatch } from "react-redux";
import Button from "../../components/Button/Button";
import Form from "../../components/Form/Form";
import Input from "../../components/Input/Input";
const formSchema = Yup.object({
  description: Yup.string().required("the description is required"),
  image: Yup.string().required("the image is required"),
});

const AddPostForm = ({ setAddPost }) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      description: "",
      image: "",
    },
    onSubmit: (values) => {
      dispatch(createPostAction(values));
      setAddPost(false);
    },
    validationSchema: formSchema,
  });

  return (
    <div className="AddPostForm">
      <Form
        title="Add Post"
        onClick={() => {
          setAddPost(false);
        }}
        onSubmit={formik.handleSubmit}
      >
        <Dropzone
          onDrop={(acceptedFiles) =>
            formik.setFieldValue("image", acceptedFiles[0])
          }
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
                <p className="dropzoneInput" style={{ borderRadius: "10px" }}>
                  + Add the image here
                </p>
              </div>
            </div>
          )}
        </Dropzone>
        <Input
          type="text"
          name="description"
          id="description"
          placeholder="Description"
          label="Description"
          fullWidth
          value={formik.values.description}
          onChange={formik.handleChange("description")}
          onBlur={formik.handleBlur("description")}
          error={
            formik.errors.description && formik.touched.description
              ? formik.errors?.description
              : null
          }
        />
        <Button text="Create Post" type="submit" />
      </Form>
    </div>
  );
};

export default AddPostForm;
