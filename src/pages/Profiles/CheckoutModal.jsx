import { useState } from "react";
import { Modal, Button, Collapse } from "react-bootstrap";
import moment from "moment";
import { API_URL } from "../../Config/Config";

const Checkout = ({ appointmentDetails, price }) => {
  console.log(appointmentDetails,price);
  return (
    <>
      <div className="container">
        {price == 0 ? (
          <div className="text-center">
            <p>This appointment is free of cost</p>
            <Button
              type="submit"
              className="mt-5 rounded-0 text-white shadow"
              style={{
                backgroundColor: "#1e81b0",
                border: "solid 1px #1e81b0",
              }}
            >
              Make the appointment
            </Button>
          </div>
        ) : (
          <>
            <h6 className="text-dark">
              Appointment charges:{" "}
              <span className="text-success">{price}$</span>
            </h6>
            <form
              action={`${API_URL}/payment/create-checkout-session/`}
              method="POST"
            >
              <input type="hidden" name="product_name" value="test_product" />
              <input type="hidden" name="price" value={price * 100} />
              <input
                type="hidden"
                name="metadata[appointment_details]"
                value={JSON.stringify(appointmentDetails)}
              />
              <Button
                type="submit"
                className="mt-5 rounded-0 text-white shadow"
                style={{
                  backgroundColor: "#1e81b0",
                  border: "solid 1px #1e81b0",
                }}
              >
                Process to payment
              </Button>
            </form>
            <em className="text-muted text-light">
              (You will be redirected to payments page)
            </em>
          </>
        )}
      </div>
    </>
  );
};

function CheckoutModal({
  selectedDate,
  selectedTimeSlot,
  doctor,
  user,
  selectAppointmentType,
  ...props
}) {
  console.log("Hello");
  const [showCheckout, setShowCheckout] = useState(false);

  const handleConfirmClick = () => {
    setShowCheckout(true);
  };

  const handleClose = () => {
    setShowCheckout(false);
    props.onHide();
  };

  const appointmentDetails = {
    doctor_id: doctor.user?.id,
    patient_id: user?.id,
    appointment_date: selectedDate,
    appointment_time: selectedTimeSlot,
    appointment_type: selectAppointmentType,
  };

  const price =
    selectAppointmentType === "online"
      ? selectedTimeSlot?.online_appointment_charge
      : selectedTimeSlot?.physical_appointment_charge;
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={handleClose}
    >
      <Modal.Header closeButton style={{ backgroundColor: "#1e81b0" }}>
        <Modal.Title
          id="contained-modal-title-vcenter"
          style={{ color: "white" }}
        >
          Appointment Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-2">
        <div style={{ padding: "20px" }}>
          <h4 style={{ color: "#1e81b0" }}>Confirm Details</h4>
          <div>
            <p className="text-muted m-0">When:</p>
            <p>{moment(selectedDate).format("dddd, ll")}</p>
            <p className="text-muted m-0">Timeslot:</p>
            <p>
              {moment(selectedTimeSlot?.start_time, "HH:mm:ss").format(
                "h:mm A"
              )}{" "}
              -{" "}
              {moment(selectedTimeSlot?.end_time, "HH:mm:ss").format("h:mm A")}
            </p>
          </div>
          <div style={{ marginTop: "20px" }}>
            <p className="text-muted m-0">Doctor:</p>
            <p>{doctor?.user?.name}</p>
          </div>
          <div style={{ marginTop: "20px" }}>
            <p className="text-muted m-0">Patient:</p>
            <p>{user?.name}</p>
          </div>
          <div style={{ marginTop: "20px" }}>
            <p className="text-muted m-0">Type:</p>
            <p>{selectAppointmentType}</p>
          </div>
          <div style={{ marginTop: "20px" }}>
            <p className="text-muted m-0">Price details:</p>
            <p>{price}</p>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <Button
            onClick={handleConfirmClick}
            className="mt-2 rounded-0 text-white shadow"
            style={{ backgroundColor: "#1e81b0", border: "solid 1px #1e81b0" }}
          >
            Confirm Details
          </Button>
        </div>
        <hr />
        <Collapse in={showCheckout}>
          <div>
            <div>
              <p className="text-dark text-center">You will be charged for:</p>
            </div>
            <Checkout price={price} appointmentDetails={appointmentDetails} />
          </div>
        </Collapse>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "#f5f5f5" }}>
        <Button
          onClick={handleClose}
          style={{
            backgroundColor: "white",
            border: "1px solid #1e81b0",
            marginRight: "10px",
          }}
        >
          <span className="text-dark">Cancel</span>
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CheckoutModal;
