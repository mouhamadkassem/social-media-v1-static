import React from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import Dropzone from "react-dropzone";
import { UploadProfileImgAction } from "../../../../redux/slices/User/User";
import { AiFillCloseCircle } from "react-icons/ai";
import Form from "../../../../components/Form/Form";
import Button from "../../../../components/Button/Button";

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
          <Form
            title="Upload Profile Image"
            onSubmit={formik.handleSubmit}
            onClick={() => {
              setUploadProImg(false);
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

            <Button text="Upload Profile Image" type="submit" />
          </Form>
        </div>
      </div>
    </div>
  );
};

export default UploadProfileImg;
