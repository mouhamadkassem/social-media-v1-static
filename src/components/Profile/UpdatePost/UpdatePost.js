import React from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import Dropzone from "react-dropzone";
import { UpdatePostAction } from "../../../redux/slices/Post/Post";

const formSchema = Yup.object({
  description: Yup.string().required("the description is required"),
  image: Yup.string().required("the image is required"),
});

const UpdatePost = ({ setUpdatePost, postId }) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      description: "",
      image: "",
    },
    onSubmit: (values) => {
      const { description, image } = values;
      const data = {
        postId,
        description,
        image,
      };
      dispatch(UpdatePostAction(data));
    },
    validationSchema: formSchema,
  });
  return (
    <div>
      <div className="AddPostForm">
        <div className="add-post-model">
          <div
            className="close-form"
            onClick={() => {
              setUpdatePost(false);
            }}
          >
            x
          </div>
          <h2>Update Post</h2>
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
            <button type="submit">Update Post</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePost;
