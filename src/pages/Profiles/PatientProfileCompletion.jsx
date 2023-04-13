import React, { useCallback, useMemo, useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Spinner,
  InputGroup,
} from "react-bootstrap";
import { uploadStates } from "../../constants/constants";
import StyledDropzone from "../../components/StyledDropzone/StyledDropzone";
import { ErrorMessage, Field, Formik } from "formik";
import PatientProfileSchema from "../../validations/schemas/PatientProfileSchema";
import uploadMedia from "../../utils/uploadMedia";
import { ErrorToast, SuccessToast } from "../../components/Toasts/Toasts";
import { useNavigate } from "react-router";
import { useUpdateProfileMutation } from "../../features/auth/authApiSlice";
import { selectUser } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "../../features/auth/authSlice";
function PatientProfileCompletion() {

  const { intialUploadState, successUploadState, errorUploadState } =
    uploadStates;
  const user = useSelector(selectUser);
  const [updateProfile] = useUpdateProfileMutation();
  const [files, setFiles] = useState([]);
  const [dropzoneErrors, setDropzoneErrors] = useState([]);
  const [imageData, setImageData] = useState(null);
  const [uploadLoading, toggleUploadLoading] = useState();
  const [uploadStatus, setUploadStatus] = useState(intialUploadState);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const dropzoneCleanup = () => {
    setDropzoneErrors([]);
    setUploadStatus(intialUploadState);
    if (imageData !== null) {
      //! REMOVE previously updated file from cloud.
      console.log("IM HERERERERRE", imageData);
      setImageData(null);
    }
  };

  const handleFilesUpdate = useCallback((dropFiles) => {
    setFiles(dropFiles);
    dropzoneCleanup();
    //! When removed make sure if the uploadUrl is set, then set it to null and remove uploaded image specified by it from cloudinary.
  }, []);

  const handleDropzoneErrors = () => {
    if (files && !files.length > 0) {
      setDropzoneErrors("Image is required");
      return false;
    }
    return true;
  };

  const Dropzone = useMemo(
    () => <StyledDropzone handleFilesUpdate={handleFilesUpdate} />,
    [handleFilesUpdate]
  );

  const AdvDropzone = (
    <>
      {Dropzone}
      <p className="p-2 text-danger">{dropzoneErrors}</p>
      {uploadLoading && (
        <>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            className="text-success"
            role="status"
            aria-hidden="true"
          />
          <span className="text-success">Uploading {files[0].path}</span>
        </>
      )}
      {uploadStatus.status === "ERROR" ? (
        <p className="text-danger">{uploadStatus.message}</p>
      ) : uploadStatus.status === "SUCCESS" ? (
        <p className="text-success">{uploadStatus.message}</p>
      ) : null}
    </>
  );
  const initialValues = {
    age: 0,
    height: 0,
    weight: 0,
    is_private: false,
    info: "",
  };
  const mutateFormValues = (formValues, mediaUrl) => ({
    ...formValues,
    is_complete: true,
    avatar_slug: mediaUrl,
    id: user?.profile_id,
  });

  const handleSubmit = async (values) => {
    console.log(values);
    setUploadStatus(intialUploadState);
    //? upload hasnt begin yet.
    try {
      if (imageData === null) {
        //? if there is no upload from this form yet. follow the normal path
        toggleUploadLoading((state) => !state);
        //? toggle the loading for upload to cloudinary.
        const mediaUploadResponse = await uploadMedia(files[0]);
        console.log(mediaUploadResponse);
        toggleUploadLoading((state) => !state);
        //? adter response is received. toggle the loading.
        if (mediaUploadResponse.status === 200) {
          //? if successful upload
          setImageData(mediaUploadResponse);
          //? setup received url for the uploaded file and save it to state.
          setUploadStatus(successUploadState);
          //? set the upload status to success.
          // const response = await addHouse(
          //   mutateFormValues(values, mediaUploadResponse.url)
          // ).unwrap();
          //? call the api with form values and upload response.
          const response = await updateProfile(
            mutateFormValues(values, mediaUploadResponse.url)
          ).unwrap();
          console.log(response);
          dispatch(setProfile(response))
          //? call the api with form values and upload response.
          SuccessToast(response.message);
          navigate("/dashboard");
          //? handle toast and modal close.
        } else {
          setUploadStatus(errorUploadState);
          //? if the upload failed set the errors state.
        }
      } else {
        const response = await updateProfile(
          mutateFormValues(values, imageData.url)
        ).unwrap();
        //? call the api with form values and upload response.
        SuccessToast(response.message);
        navigate("/dashboard");
      }
    } catch (err) {
      ErrorToast(err.message);
    }
  };

  return (
    <Container className="p-5 mt-5">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <span className="text-dark text-muted">
            Welcome to Online Hospital
          </span>
          <h1 className="text-dark my-5 text-bold">
            Welcome! Lets complete your profile
          </h1>
          <span className="text-muted">
            Please note that adding a profile picture on the online hospital
            management system is optional. You have the choice to stay anonymous
            or upload a picture and mark yourself private if you're not
            comfortable with others seeing your image. The decision is entirely
            up to you.
          </span>
          <hr />
          <div className="pt-5">
            <Formik
              initialValues={initialValues}
              validationSchema={PatientProfileSchema}
              onSubmit={(values) =>
                handleDropzoneErrors() && handleSubmit(values)
              }
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
              }) => (
                <>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicProfile">
                      {AdvDropzone}
                    </Form.Group>
                    <Container className="w-100 p-0">
                      <Row>
                        <Col>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicHeight"
                          >
                            <InputGroup>
                              <Form.Control
                                type="number"
                                name="height"
                                placeholder="Height (cm)"
                                className="py-4 field-color rounded-0"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.height}
                                isInvalid={touched.height && !!errors.height}
                                isValid={touched.height && !errors.height}
                                disabled={uploadLoading}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.height}
                              </Form.Control.Feedback>
                            </InputGroup>
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicWeight"
                          >
                            <InputGroup>
                              <Form.Control
                                type="number"
                                placeholder="Weight (kg)"
                                className="py-4 field-color rounded-0"
                                name="weight"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.weight}
                                isInvalid={touched.weight && !!errors.weight}
                                isValid={touched.weight && !errors.weight}
                                disabled={uploadLoading}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.weight}
                              </Form.Control.Feedback>
                            </InputGroup>
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicWeight"
                          >
                            <InputGroup>
                              <Form.Control
                                type="number"
                                required
                                placeholder="age"
                                className="py-4 field-color rounded-0"
                                name="age"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.age}
                                disabled={uploadLoading}
                                isInvalid={touched.age && !!errors.age}
                                isValid={touched.age && !errors.age}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.age}
                              </Form.Control.Feedback>
                            </InputGroup>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="pt-4">
                        <Col>
                          <span className="text-muted">
                            Take a moment to provide a brief description of
                            yourself that doctors may see. This information will
                            help them understand your medical needs better and
                            provide you with more personalized care
                          </span>
                          <Form.Group
                            className="mb-3 py-3"
                            controlId="formBasicWeight"
                          >
                            <InputGroup>
                              <Form.Control
                                type="text"
                                placeholder="Tell us more about yourself!"
                                className="field-color rounded-0 py-4"
                                name="info"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.info}
                                disabled={uploadLoading}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.info}
                              </Form.Control.Feedback>
                            </InputGroup>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="py-2">
                        <Col>
                          <Form.Check
                            onChange={handleChange}
                            onBlur={handleBlur}
                            label="Should we hide your profile?"
                            name="is_private"
                            type="checkbox"
                            value={values.is_private}
                            disabled={uploadLoading}
                          />
                        </Col>
                      </Row>
                    </Container>
                    <Container className="p-0 mt-5">
                      <Row lg={2} md={2} xl={2} className="gy-2 p-0 m-0">
                        <Col
                          md="auto"
                          lg="auto"
                          className="d-flex justify-content-center justify-content-md-start p-0"
                        >
                          <Button
                            className="btn-dark rounded-0 text-black-50 shadow"
                            type="submit"
                            disabled={uploadLoading}
                          >
                            <div className="d-flex gap-2 px-4 justify-content-center align-items-center text-white">
                              {uploadLoading && (
                                <Spinner
                                  as="span"
                                  animation="border"
                                  size="sm"
                                  className=""
                                  role="status"
                                  aria-hidden="true"
                                />
                              )}
                              Submit
                            </div>
                          </Button>
                        </Col>
                      </Row>
                    </Container>
                  </Form>
                </>
              )}
            </Formik>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default PatientProfileCompletion;
