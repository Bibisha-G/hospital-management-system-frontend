import LoginContainer from "./LoginContainer";
import { Col, Container, Row } from "react-bootstrap";
import doctorRegister from "../../assets/Auth/medicine-animate.svg";
function LoginPage() {
  return (
    <Container
      fluid
      className="main-wrapper p-0"
      style={{ overflowX: "hidden", height: "100vh" }}
    >
      <Row className="h-100">
        <Col
          lg={7}
          className="d-flex justify-content-center align-items-center bg-success bg-opacity-50"
        >
          <img
            src={doctorRegister}
            className="img-fluid"
            alt="image"
            style={{
              maxHeight: 700,
            }}
          />
        </Col>
        <Col lg={5}>
          <LoginContainer />
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
