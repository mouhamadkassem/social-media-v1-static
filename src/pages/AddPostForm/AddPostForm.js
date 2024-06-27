import React, { useEffect } from "react";
import "./AddPostForm.css";
import Dropzone from "react-dropzone";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createPostAction } from "../../redux/slices/Post/Post";
import { useDispatch } from "react-redux";
import { AiFillCloseCircle } from "react-icons/ai";
const formSchema = Yup.object({
  description: Yup.string().required("the description is required"),
  image: Yup.string().required("the image is required"),
});

const AddPostForm = ({ addPost, setAddPost }) => {
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
      <div className="add-post-model">
        <div
          className="close-form"
          onClick={() => {
            setAddPost(false);
          }}
        >
          <AiFillCloseCircle size={20} />
        </div>
        <h2>Add Post</h2>
        <form className="form-post" onSubmit={formik.handleSubmit}>
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
                  <p
                    className="cursor-pointer bg-blue-100 mt-2 text-center py-4"
                    style={{ borderRadius: "10px" }}
                  >
                    + Add the image here
                  </p>
                </div>
              </div>
            )}
          </Dropzone>
          <label
            style={{ marginTop: "10px", cursor: "pointer" }}
            htmlFor="description"
          >
            description
          </label>
          <input
            type="text"
            id="description"
            value={formik.values.description}
            onChange={formik.handleChange("description")}
            onBlur={formik.handleBlur("description")}
          />
          <button type="submit">Create Post</button>
        </form>
      </div>
    </div>
  );
};

export default AddPostForm;
