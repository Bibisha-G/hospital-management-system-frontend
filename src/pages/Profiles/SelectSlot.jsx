import React, { useState } from "react";
import moment from "moment";
import { Button, Card, Collapse, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import { API_URL } from "../../Config/Config";
import CheckoutModal from "./CheckoutModal";
import { useGetAvailabilityQuery } from "../../features/doctor/doctorApiSlice";
import { selectUserType } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
const SelectSlot = ({ doctor }) => {
  const user = useSelector(selectUser);
  const userType = useSelector(selectUserType);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectAppointmentType, setSelectAppointmentType] = useState(null);
  const [modalShow, setModalShow] = React.useState(false);
  const navigate = useNavigate();

  const { data: availability, isLoading } = useGetAvailabilityQuery(doctor?.id);

  console.log(availability);

  if (isLoading) {
    return "Loading...";
  }

  const handleDateSelection = (date) => {
    setSelectedDate(date);
    const selectedDay = availability.find(
      (day) => day.day === moment(date).day()
    );
    setSelectedTimeSlot(
      selectedDay && selectedDay.time_slots.length > 0
        ? selectedDay.time_slots[0]
        : null
    );
  };

  const handleTimeSlotSelection = (id) => {
    setSelectedTimeSlot(id);
  };

  const renderDateButtons = () => {
    const buttons = [];
    for (let i = 0; i < 10; i++) {
      const date = moment().add(i, "days");
      const isToday = moment().isSame(date, "day");
      const isSelected = selectedDate
        ? selectedDate.isSame(date, "day")
        : false;
      const buttonClass = isToday
        ? "btn mx-1 font-weight-bold disabled"
        : isSelected
        ? "btn mx-1 font-weight-bold"
        : "btn mx-1";
      const buttonStyles = isToday
        ? { backgroundColor: "#1e81b0", border: "solid 1px #1e81b0" }
        : isSelected
        ? { backgroundColor: "#1e81b0", border: "solid 1px #1e81b0" }
        : {
            backgroundColor: "white",
            border: "solid 1px #1e81b0",
            color: "black",
          };
      buttons.push(
        <Button
          key={i}
          className={buttonClass}
          style={buttonStyles}
          onClick={() => handleDateSelection(date)}
        >
          <div>{date.format("ddd")}</div>
          <div>{date.format("MMM D")}</div>
        </Button>
      );
    }
    return buttons;
  };
  console.log(user.profile_id, doctor.id);
  return (
    <>
      {user.profile_id === doctor.id || userType === "Patient" ? (
        <div>
          <div>
            <p className="text-dark">Select a date:</p>
            <div className="d-flex overflow-auto">{renderDateButtons()}</div>

            {selectedDate ? (
              <div className="mt-5">
                <p>Available time slots:</p>
                <div className="d-flex flex-wrap gap-2">
                  {availability.map((day) => {
                    if (
                      day.day === moment(selectedDate).day() &&
                      day.time_slots.length > 0
                    ) {
                      return day.time_slots.map((timeSlot) => (
                        <Card
                          key={timeSlot.id}
                          style={
                            timeSlot === selectedTimeSlot
                              ? { backgroundColor: "#1e81b0", color: "white" }
                              : { backgroundColor: "white" }
                          }
                          onClick={() => handleTimeSlotSelection(timeSlot)}
                        >
                          <Card.Body>
                            <Card.Title>
                              {moment(timeSlot.start_time, "HH:mm:ss").format(
                                "h:mm A"
                              )}{" "}
                              -{" "}
                              {moment(timeSlot.end_time, "HH:mm:ss").format(
                                "h:mm A"
                              )}
                            </Card.Title>
                            <Card.Text
                              className={`${
                                timeSlot === selectedTimeSlot
                                  ? "text-white"
                                  : "text-dark"
                              }`}
                            >
                              Online Price: {timeSlot.online_appointment_charge}{" "}
                              | Physical Price:{" "}
                              {timeSlot.physical_appointment_charge}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      ));
                    }
                  })}
                </div>
              </div>
            ) : (
              <p className="mt-5">
                Appointments timeslots will show when you select a date
              </p>
            )}
            {selectedTimeSlot && (
              <div className="d-flex gap-2">
                <Button
                  type="submit"
                  disabled={!selectedDate || !selectedTimeSlot}
                  onClick={() => setSelectAppointmentType("online")}
                  className="mt-5 rounded-2 text-black-50 shadow"
                  style={
                    selectAppointmentType === "online"
                      ? {
                          backgroundColor: "#1e81b0",
                          color: "white",
                          border: "solid 1px #1e81b0",
                        }
                      : {
                          backgroundColor: "white",
                          border: "solid 1px #1e81b0",
                        }
                  }
                >
                  <span
                    className={
                      selectAppointmentType === "online"
                        ? "text-white"
                        : "text-black"
                    }
                  >
                    Online Appointment
                  </span>
                </Button>
                <Button
                  type="submit"
                  disabled={!selectedDate || !selectedTimeSlot}
                  onClick={() => setSelectAppointmentType("physical")}
                  className="mt-5 rounded-2 text-black-50 shadow"
                  style={
                    selectAppointmentType === "physical"
                      ? {
                          backgroundColor: "#1e81b0",
                          color: "white",
                          border: "solid 1px #1e81b0",
                        }
                      : {
                          backgroundColor: "white",
                          border: "solid 1px #1e81b0",
                        }
                  }
                >
                  <span
                    className={
                      selectAppointmentType === "physical"
                        ? "text-white"
                        : "text-black"
                    }
                  >
                    Physical Appointment
                  </span>
                </Button>
              </div>
            )}
          </div>

          {user.profile_id === doctor.id && userType === "Doctor" ? (
            <div className="d-flex justify-content-end">
              <Button
                type="submit"
                onClick={() => navigate("/dashboard/setup_availability")}
                className="mt-5 rounded-0 text-black-50 shadow"
                style={{
                  backgroundColor: "#1e81b0",
                  border: "solid 1px #1e81b0",
                }}
              >
                <span className="text-light">Edit your Availability</span>
              </Button>
            </div>
          ) : (
            <div className="d-flex justify-content-end">
              <Button
                type="submit"
                disabled={
                  !selectedDate || !selectedTimeSlot || !selectAppointmentType
                }
                onClick={() => setModalShow(true)}
                className="mt-5 rounded-0 text-black-50 shadow"
                style={{
                  backgroundColor: "#1e81b0",
                  border: "solid 1px #1e81b0",
                }}
              >
                <span className="text-light">Book Appointment</span>
              </Button>
            </div>
          )}
          <CheckoutModal
            show={modalShow}
            doctor={doctor}
            user={user}
            selectAppointmentType={selectAppointmentType}
            onHide={() => setModalShow(false)}
            selectedDate={selectedDate}
            selectedTimeSlot={selectedTimeSlot}
          />
        </div>
      ) : (
        <div className="text-center">Only Patients can make appointments</div>
      )}
    </>
  );
};

export default SelectSlot;
