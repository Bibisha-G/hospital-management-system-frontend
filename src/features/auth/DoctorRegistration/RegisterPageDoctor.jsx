import RegisterContainerDoctor from "./RegisterContainerDoctor";
import { Col, Container, Row } from "react-bootstrap";
import doctorRegister from "../../../assets/Auth/doctors-animate.svg";

function RegisterPageDoctor() {
  return (
    <Container
      fluid
      className="main-wrapper p-0"
      // className="main-wrapper p-0"
      style={{ overflowX: "hidden" }}
    >
      <Row className="h-100">
        <Col lg={5}>
          <RegisterContainerDoctor />
        </Col>
        <Col
          lg={7}
          className="d-flex justify-content-center align-items-center"
          // className="d-flex justify-content-center align-items-center bg-success bg-opacity-50"
        >
          <img
            src={doctorRegister}
            className="img-fluid"
            alt="image"
            style={{
              maxHeight: 850,
            }}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default RegisterPageDoctor;
