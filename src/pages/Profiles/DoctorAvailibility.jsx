import { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

function DoctorAvailability() {
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
    if (updatedDays[dayIndex].timeSlots.length < 8) {
      updatedDays[dayIndex].timeSlots.push({
        startTime: "",
        endTime: "",
      });
      setDaysOfWeek(updatedDays);
    }
  };

  const handleRemoveTimeSlot = (dayIndex, slotIndex) => {
    const updatedDays = [...daysOfWeek];
    updatedDays[dayIndex].timeSlots.splice(slotIndex, 1);
    setDaysOfWeek(updatedDays);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(daysOfWeek);
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
            <Col className="p-5 border border-black" key={day}>
              <div className="mb-4">
                <h2 className="text-dark">{day}</h2>
                {timeSlots.map(({ startTime, endTime }, slotIndex) => (
                  <div
                    key={slotIndex}
                    className="d-flex align-items-center mb-2"
                  >
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
                      className="me-2"
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
                      className="me-2"
                    />
                    {timeSlots.length > 0 && (
                      <Button
                        className="btn-danger rounded-0 text-black-50 shadow"
                        size="sm"
                        onClick={() =>
                          handleRemoveTimeSlot(dayIndex, slotIndex)
                        }
                      >
                        <span className="text-light">Remove</span>
                      </Button>
                    )}
                  </div>
                ))}
                {timeSlots.length < 8 && (
                  <Button
                    className="btn-dark rounded-0 text-black-50 shadow"
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
            className="mt-5 btn-dark rounded-0 text-black-50 shadow"
          >
            <span className="text-light">Create Timeslots</span>
          </Button>
        </Row>
      </Container>
    </Form>
  );
}

export default DoctorAvailability;
