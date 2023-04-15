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
import uploadMedia from "../../utils/uploadMedia";
import { ErrorToast, SuccessToast } from "../../components/Toasts/Toasts";
import { useNavigate } from "react-router";
import { useUpdateDoctorProfileMutation } from "../../features/auth/authApiSlice";
import { selectProfile, selectUser, setProfile } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import DoctorProfileSchema from "../../validations/schemas/DoctorProfileSchema";

function DoctorProfileCompletion({ departments }) {
  const { intialUploadState, successUploadState, errorUploadState } =
    uploadStates;
  const user = useSelector(selectUser);
  const profile = useSelector(selectProfile)
  const [updateProfile] = useUpdateDoctorProfileMutation();
  const [files, setFiles] = useState([]);
  const [dropzoneErrors, setDropzoneErrors] = useState([]);
  const [imageData, setImageData] = useState(null);
  const [uploadLoading, toggleUploadLoading] = useState();
  const [uploadStatus, setUploadStatus] = useState(intialUploadState);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const dropzoneCleanup = () => {
    setDropzoneErrors([]);
    setUploadStatus(intialUploadState);
    if (imageData !== null) {
      //! REMOVE previously updated file from cloud.
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
    age: profile?.age ?? "",
    experience: profile?.experience ??"",
    specialization: profile?.specialization ?? "",
    is_private: profile?.is_private ?? false,
    info: profile?.info ?? "",
    qualifications: profile?.qualifications ?? "",
    treatments: profile?.treatments ?? "",
    department: profile?.department ?? "",
  };
  const mutateFormValues = (formValues, mediaUrl) => ({
    ...formValues,
    is_complete: true,
    avatar_slug: mediaUrl,
    id: user?.profile_id,
  });

  const handleSubmit = async (values) => {
    setUploadStatus(intialUploadState);
    //? upload hasnt begin yet.
    try {
      if (imageData === null) {
        //? if there is no upload from this form yet. follow the normal path
        toggleUploadLoading((state) => !state);
        //? toggle the loading for upload to cloudinary.
        const mediaUploadResponse = await uploadMedia(files[0]);
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
          dispatch(setProfile(response));
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
          <br />
          <h5 className="text-dark fw-light mt-5">
            We are always looking for <strong>talented</strong> doctors to join
            our network
          </h5>
          <h1 className="text-dark my-5 text-bold">
            Welcome! Lets complete your profile
          </h1>
          <hr />
          <p className="text-muted mt-5">
            Please upload a professional photo of yourself to be displayed on
            the online hospital management system. This will help patients
            recognize you and establish a stronger connection, leading to better
            patient outcomes
          </p>
          <div className="pt-2">
            <Formik
              initialValues={initialValues}
              validationSchema={DoctorProfileSchema}
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
                      <Row id="age_experience">
                        <Col>
                          <Form.Group className="mb-3" controlId="formBasicAge">
                            <InputGroup>
                              <Form.Control
                                type="number"
                                required
                                placeholder="Age"
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
                        <Col>
                          <Form.Group className="mb-3" controlId="formBasicAge">
                            <InputGroup>
                              <Form.Control
                                type="number"
                                required
                                placeholder="Experience"
                                className="py-4 field-color rounded-0"
                                name="experience"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.experience}
                                disabled={uploadLoading}
                                isInvalid={
                                  touched.experience && !!errors.experience
                                }
                                isValid={
                                  touched.experience && !errors.experience
                                }
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.experience}
                              </Form.Control.Feedback>
                            </InputGroup>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="pt-4" id="department">
                        <Col>
                          <p className="text-muted">Select your department</p>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicDepartment"
                          >
                            <InputGroup>
                              <Form.Select
                                required
                                className="py-4 field-color rounded-0 form-select-md mt-2"
                                name="department"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.department}
                                isInvalid={
                                  touched.department && !!errors.department
                                }
                                isValid={
                                  touched.department && !errors.department
                                }
                                disabled={uploadLoading}
                              >
                                <option disabled value="" hidden>
                                  Department
                                </option>
                                {departments &&
                                  departments.map((department) => (
                                    <option
                                      value={department.id}
                                      key={department.id}
                                    >
                                      {department.name}
                                    </option>
                                  ))}
                              </Form.Select>
                              <Form.Control.Feedback type="invalid">
                                {errors.department}
                              </Form.Control.Feedback>
                            </InputGroup>
                          </Form.Group>
                        </Col>
                      </Row>
                      <hr />
                      <Row id="special_qual_treat" className="mt-5">
                        <p className="text-muted">Professional Information</p>
                        <Col>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicWeight"
                          >
                            <InputGroup>
                              <Form.Control
                                type="text"
                                required
                                placeholder="Your doctoral specialization"
                                className="py-4 field-color rounded-0"
                                name="specialization"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.specialization}
                                disabled={uploadLoading}
                                isInvalid={
                                  touched.specialization &&
                                  !!errors.specialization
                                }
                                isValid={
                                  touched.specialization &&
                                  !errors.specialization
                                }
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.specialization}
                              </Form.Control.Feedback>
                            </InputGroup>
                            <span
                              className="text-muted d-flex justify-content-end"
                              style={{ fontSize: "12px" }}
                            >
                              <span
                                className={
                                  values.specialization?.length > 75
                                    ? "text-danger"
                                    : undefined
                                }
                              >
                                {values.specialization?.length}
                              </span>
                              /75
                            </span>
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicWeight"
                          >
                            <InputGroup>
                              <Form.Control
                                type="text"
                                required
                                placeholder="Your qualifications"
                                className="py-4 field-color rounded-0"
                                name="qualifications"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.qualifications}
                                disabled={uploadLoading}
                                isInvalid={
                                  touched.qualifications &&
                                  !!errors.qualifications
                                }
                                isValid={
                                  touched.qualifications &&
                                  !errors.qualifications
                                }
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.qualifications}
                              </Form.Control.Feedback>
                            </InputGroup>
                            <span
                              className="text-muted d-flex justify-content-end"
                              style={{ fontSize: "12px" }}
                            >
                              <span
                                className={
                                  values.qualifications?.length > 75
                                    ? "text-danger"
                                    : undefined
                                }
                              >
                                {values.qualifications?.length}
                              </span>
                              /75
                            </span>
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicWeight"
                          >
                            <InputGroup>
                              <Form.Control
                                type="text"
                                required
                                placeholder="Treatments your offer"
                                className="py-4 field-color rounded-0"
                                name="treatments"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.treatments}
                                disabled={uploadLoading}
                                isInvalid={
                                  touched.treatments && !!errors.treatments
                                }
                                isValid={
                                  touched.treatments && !errors.treatments
                                }
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.treatments}
                              </Form.Control.Feedback>
                            </InputGroup>
                            <span
                              className="text-muted d-flex justify-content-end"
                              style={{ fontSize: "12px" }}
                            >
                              <span
                                className={
                                  values.treatments?.length > 120
                                    ? "text-danger"
                                    : undefined
                                }
                              >
                                {values.treatments?.length}
                              </span>
                              /120
                            </span>
                          </Form.Group>
                        </Col>
                      </Row>
                      <hr />
                      <Row className="pt-4">
                        <p className="text-muted">General Information</p>
                        <Col>
                          <span className="text-muted">
                            Provide a brief introduction about yourself. This
                            information will help patients get to know you
                            better and feel more comfortable seeking your
                            medical expertise
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

export default DoctorProfileCompletion;
