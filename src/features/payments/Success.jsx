import { Button, Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const Success = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  let session_id = searchParams.get("session_id");
  const navigate = useNavigate();
  return (
    <>
      <Container className="p-5 mt-5">
        <Row>
          <Col>
            <div className="text-center">
              <h4 className="text-success">
                Appointment created successfully!
              </h4>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-center">
            <Button
              onClick={() => navigate("/dashboard/appointments")}
              className="mt-5 rounded-0 text-black-50 shadow"
              style={{
                backgroundColor: "#1e81b0",
              }}
            >
              <span className="text-light">View my Appointments</span>
            </Button>
          </Col>
          <Col className="d-flex justify-content-center">
            <Button
              onClick={() => navigate("/dashboard")}
              className="mt-5 rounded-0 text-black-50 shadow"
              style={{
                backgroundColor: "#1e81b0",
              }}
            >
              <span className="text-light">Goto Dashboard</span>
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Success;
