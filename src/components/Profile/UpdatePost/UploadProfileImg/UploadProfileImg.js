import React from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import Dropzone from "react-dropzone";
import { UploadProfileImgAction } from "../../../../redux/slices/User/User";
import { AiFillCloseCircle } from "react-icons/ai";

const formSchema = Yup.object({
  image: Yup.string().required("the image is required"),
});

const UploadProfileImg = ({ setUploadProImg }) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      image: "",
    },
    onSubmit: (values) => {
      dispatch(UploadProfileImgAction(values));
      setUploadProImg(false);
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
              setUploadProImg(false);
            }}
          >
            <AiFillCloseCircle size={20} />
          </div>
          <h2>Upload Profile image</h2>
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

            <button type="submit">Upload Profile image</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadProfileImg;
