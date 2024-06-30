import React from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import Dropzone from "react-dropzone";
import { UpdatePostAction } from "../../../redux/slices/Post/Post";
import Form from "../../../components/Form/Form";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";

const formSchema = Yup.object({
  description: Yup.string().required("the description is required"),
  image: Yup.string().required("the image is required"),
});

const UpdatePost = ({ setUpdatePost, postId }) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    enableReinitialize: true,
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
        <Form
          title="Update Post"
          onSubmit={formik.handleSubmit}
          onClick={() => {
            setUpdatePost(false);
          }}
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
                  <p className="dropzoneInput">+ Add the image here</p>
                </div>
              </div>
            )}
          </Dropzone>
          {formik.touched.image && formik.errors.image ? (
            <div className="error">{formik.errors.image}</div>
          ) : null}
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

          <Button text="Update Post" type="submit" />
        </Form>
      </div>
    </div>
  );
};

export default UpdatePost;
