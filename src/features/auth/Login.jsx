import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorToast } from "../../components/Toasts/Toasts";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import { Formik } from "formik";
import "./Login.css";
import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import LoginSchema from "../../validations/schemas/LoginSchema";
import { AiOutlineMail, AiOutlineEye, AiFillEye } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);

  const signIn = async (values) => {
    try {
      const response = await login(values).unwrap();
      dispatch(setCredentials(response));
      navigate("/");
    } catch (err) {
      ErrorToast(err.error);
      ErrorToast(err.message);
    }
  };

  const passwordHandler = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={(values) => {
          signIn(values);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <div>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <InputGroup hasValidation>
                  <InputGroup.Text className="text-muted">
                    <AiOutlineMail />
                  </InputGroup.Text>
                  <Form.Control
                    type="email"
                    required
                    placeholder="Email address"
                    className="py-4 field-color"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    isInvalid={touched.email && !!errors.email}
                    isValid={touched.email && !errors.email}
                    disabled={isLoading}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </InputGroup>
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <InputGroup>
                  <InputGroup.Text className="text-muted">
                    <RiLockPasswordLine />
                  </InputGroup.Text>
                  <Form.Control
                    required
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="py-4 field-color"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    isInvalid={!!errors.password && touched.password}
                    isValid={touched.password && !errors.password}
                    disabled={isLoading}
                  />
                  <InputGroup.Text
                    className="text-muted"
                    onClick={passwordHandler}
                  >
                    {showPassword ? <AiOutlineEye /> : <AiFillEye />}
                  </InputGroup.Text>
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Container fluid className="pt-5">
                <Row lg={2} md={2} xl={2} className="gy-2">
                  <Col
                    md="auto"
                    lg="auto"
                    className="d-flex justify-content-center justify-content-md-start"
                  >
                    <Button
                      className="btn-blue rounded-pill text-black-50 shadow"
                      type="submit"
                      disabled={isLoading}
                    >
                      <div className="d-flex gap-2 px-4 justify-content-center align-items-center text-white">
                        {isLoading && (
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            className=""
                            role="status"
                            aria-hidden="true"
                          />
                        )}
                        Login
                      </div>
                    </Button>
                  </Col>
                  <Col
                    md={7}
                    lg={7}
                    className="d-flex justify-content-center justify-content-md-start"
                  >
                    <Button
                      variant="light"
                      className="rounded-pill btn-outline-secondary shadow text text-xl-start"
                      type="submit"
                      disabled={isLoading}
                      onClick={() => navigate("/register_patient")}
                    
                    >
                      Create Account
                    </Button>
                  </Col>
                </Row>
              </Container>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default Login;
