import { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { selectProfile } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";
import { useSetAvailabilityMutation } from "../../features/doctor/doctorApiSlice";
function DoctorAvailability() {
  const profile = useSelector(selectProfile)
  const [makeAppointment, {isLoading}] = useSetAvailabilityMutation()
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const [daysOfWeek, setDaysOfWeek] = useState(
    days.map((day) => ({
      day,
      timeSlots: [],
    }))
  );

  const handleTimeSlotChange = (dayIndex, slotIndex, field, value) => {
    const updatedDays = [...daysOfWeek];
    updatedDays[dayIndex].timeSlots[slotIndex][field] = value;
    setDaysOfWeek(updatedDays);
  };

  const handleAddTimeSlot = (dayIndex) => {
    const updatedDays = [...daysOfWeek];
    if (updatedDays[dayIndex].timeSlots.length < 5) {
      updatedDays[dayIndex].timeSlots.push({
        startTime: "",
        endTime: "",
        online_appointment_charge: "",
        physical_appointment_charge: "",
      });
      setDaysOfWeek(updatedDays);
    }
  };

  const handleRemoveTimeSlot = (dayIndex, slotIndex) => {
    const updatedDays = [...daysOfWeek];
    updatedDays[dayIndex].timeSlots.splice(slotIndex, 1);
    setDaysOfWeek(updatedDays);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(daysOfWeek);
    await makeAppointment({id:profile.id,body:daysOfWeek}).unwrap();
    // TODO: Send data to Django backend
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Container style={{ maxHeight: 800, overflow: "auto" }}>
        <Row
          lg={2}
          xl={2}
          xxl={2}
          md={2}
          sm={1}
          xs={1}
          className="d-flex justify-content-center"
        >
          {daysOfWeek.map(({ day, timeSlots }, dayIndex) => (
            <Col className="border border-black" key={day}>
              <div className="mb-4">
                <h6 className="text-dark text-center text-muted mt-2">{day}</h6>
                {timeSlots.map(
                  (
                    {
                      startTime,
                      endTime,
                      online_appointment_charge,
                      physical_appointment_charge,
                    },
                    slotIndex
                  ) => (
                    <div key={slotIndex}>
                      <div className="px-5 py-2">
                        <p className="text-muted m-0">Timeslot details</p>
                        <div className="d-flex align-items-center mb-2">
                          <Form.Control
                            type="time"
                            value={startTime}
                            onChange={(e) =>
                              handleTimeSlotChange(
                                dayIndex,
                                slotIndex,
                                "startTime",
                                e.target.value
                              )
                            }
                            className="me-2 rounded-0"
                          />
                          <Form.Control
                            type="time"
                            value={endTime}
                            onChange={(e) =>
                              handleTimeSlotChange(
                                dayIndex,
                                slotIndex,
                                "endTime",
                                e.target.value
                              )
                            }
                            className="me-2 rounded-0"
                          />
                          {timeSlots.length > 0 && (
                            <Button
                              className="btn-danger rounded-0 text-black-50"
                              size="sm"
                              onClick={() =>
                                handleRemoveTimeSlot(dayIndex, slotIndex)
                              }
                            >
                              <span className="text-light">Remove</span>
                            </Button>
                          )}
                        </div>
                        <div>
                          <p className="text-muted m-0"> Price details</p>
                          <Form.Control
                            type="number"
                            value={online_appointment_charge}
                            placeholder="Online Appointment Price"
                            onChange={(e) =>
                              handleTimeSlotChange(
                                dayIndex,
                                slotIndex,
                                "online_appointment_charge",
                                e.target.value
                              )
                            }
                            className="me-2 my-2 rounded-0"
                          />
                          <Form.Control
                            type="number"
                            value={physical_appointment_charge}
                            placeholder="Physical Appointment Price"
                            onChange={(e) =>
                              handleTimeSlotChange(
                                dayIndex,
                                slotIndex,
                                "physical_appointment_charge",
                                e.target.value
                              )
                            }
                            className="me-2 my-2 rounded-0"
                          />
                        </div>
                      </div>
                      <div>
                        <hr />
                      </div>
                    </div>
                  )
                )}
                {timeSlots.length < 5 && (
                  <Button
                    className="btn-primary rounded-0 text-black-50"
                    size="sm"
                    onClick={() => handleAddTimeSlot(dayIndex)}
                  >
                    <span className="text-light">Add time slot</span>
                  </Button>
                )}
              </div>
            </Col>
          ))}
          <Button
            type="submit"
            className="mt-5 btn-primary rounded-0 text-black-50 shadow"
          >
            <span className="text-light">Create Timeslots</span>
          </Button>
        </Row>
      </Container>
    </Form>
  );
}

export default DoctorAvailability;
