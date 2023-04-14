import { Col, Container, Row } from "react-bootstrap";
import Login from "./Login";
import "./LoginContainer.css";

const LoginContainer = () => {
  return (
    <Container fluid className="h-100">
      <Row className="d-flex justify-content-center align-items-center h-100">
        <Col md={8} className="pt-5 primary-col">
          <Row className="justify-content-center align-items-center">
            <Col className="text-center text-md-start">
              <h1 className="display-6">Take care of your health with us!</h1>
              <p className="text-muted">
                Revolutionizing Healthcare Management, One Click at a Time -
                Your Partner in Patient Care.
              </p>
            </Col>
          </Row>
          <Row className="justify-content-center align-items-center py-lg-5 py-2">
            <Col>
              <Login />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginContainer;
