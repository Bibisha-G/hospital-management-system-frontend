import { Button, Container } from "react-bootstrap";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const Success = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  let session_id = searchParams.get("session_id");
  const navigate = useNavigate();
  return (
    <>
      <Container className="p-5">
        <div className="text-center">
          <h4>Appointment created successfully!</h4>
        </div>
        <div>
          <Button
            onClick={() => navigate("/dashboard/appointments")}
            className="mt-5 rounded-0 text-black-50 shadow"
            style={{ backgroundColor: "#1e81b0", border: "solid 1px #1e81b0" }}
          >
            <span className="text-light">View My Appointments</span>
          </Button>
        </div>
      </Container>
    </>
  );
};

export default Success;
