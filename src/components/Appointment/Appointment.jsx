import MobileImg from "../../assets/mobile.png";
import WomanImg from "../../assets/womenCartoon.png";
import "./Appointment.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import { useLazyGetDepartmentsQuery } from "../../features/department/departmentApiSlice";
import { useLazyGetDeptDoctorsQuery } from "../../features/department/departmentApiSlice";
import AppoitmentSchema from "../../validations/schemas/AppointmentSchema";
import { useCreateApointmentMutation } from "../../features/appointment/appointmentApiSlice";
import { selectUser } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
function Appointment() {
  const [departments, setDepartments] = useState()
  const [doctors, setDoctors] = useState()
  const user = useSelector(selectUser)
  const [createAppointment, { isLoading: AppointmentLoading }] = useCreateApointmentMutation()
  const [getDepartments, { isLoading }] = useLazyGetDepartmentsQuery()
  const [getDoctors, { isLoading: LoadingDoctors }] = useLazyGetDeptDoctorsQuery()

  useEffect(() => {
    let getData = async () => {
      let response = await getDepartments().unwrap();
      setDepartments(response);
    }
    getData()
  }, [])

  const initialValues = {
    department: "",
    doctor: "",
    date: "",
  };
  const handleDept = async (value) => {
    try {
      let response = await getDoctors(value).unwrap();
      console.log(response);
      setDoctors(response)
    }
    catch (e) {
      console.log(error);
    }
  }
  const onSubmit = async (values) => {
    let end = values.date;
    end = end.split('');
    let rem = (end[end.length - 5]) + (Number(end[end.length - 4]) + 1);
    rem = Number(rem)
    if (rem > 23) {
      end[end.length - 5] = String(rem % 24)
      end[end.length - 4] = parseInt(rem / 24)
    }
    else {
      end[end.length - 4] = String((Number(end[end.length - 4]) + 1));
    }
    end = end.join("");
    console.log(end)
    try {
      let response = await createAppointment({start_time:values.date,end_time:end,doctor:Number(values.doctor),patient:user.id}).unwrap();
      console.log(response);
    }
    catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <section className="section-area account-wraper1">
        <div className="container-fluid">
          <div className="appointment-inner section-sp2">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-xl-5 col-lg-6 col-md-6 col-sm-12">
                  <div className="appointment-form form-wraper">
                    <h3>Book Appointment</h3>
                    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={AppoitmentSchema}>
                      {({ values, handleChange, handleBlur, setFieldValue }) => (
                        <Form>
                          <div className="form-group">
                            {isLoading ? (
                              <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                              </div>
                            ) : (
                              <Field
                                name="department"
                                as="select"
                                required
                                className="form-select form-control"
                                placeholder="Select Department"
                                value={values.department}
                                onChange={(e) => { handleDept(e.target.value); setFieldValue('department', e.target.value) }}
                                onBlur={handleBlur}
                              >
                                <option disabled value="" hidden>Select Department</option>
                                {departments && departments.map((dep) => (
                                  <option value={dep.id} key={dep.id}>{dep.name}</option>

                                ))}
                              </Field>
                            )}
                          </div>
                          <div className="form-group">
                            {LoadingDoctors ? (
                              <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                              </div>
                            ) : (
                              <Field
                                name="doctor"
                                as="select"
                                required
                                className="form-select form-control"
                                value={values.doctor}
                                onBlur={handleBlur}
                                onChange={handleChange}

                              >
                                <option disabled value="" hidden>Select Doctor</option>
                                {doctors && doctors.map((doc) => (
                                  <option value={doc.id} key={doc.id}>{doc.user.name}</option>

                                ))}

                              </Field>
                            )}
                          </div>
                          {/* <div className="form-group">
                            <Field
                              name="name"
                              type="text"
                              className="form-control"
                              placeholder="Your Name"
                              value={values.name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div> */}
                          {/* <div className="form-group">
                            <Field
                              name="phone"
                              type="number"
                              className="form-control"
                              placeholder="Phone Numbers"
                              value={values.phone}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div> */}
                          <div className="form-group">
                            <Field
                              name="date"
                              required
                              type="datetime-local"
                              className="form-control"
                              value={values.date}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                          {user &&
                          <button
                            type="submit"
                            className="btn btn-secondary btn-lg"
                          ><div className="d-flex gap-2 px-4 justify-content-center align-items-center text-white">
                              {AppointmentLoading && (
                                <Spinner
                                  as="span"
                                  animation="border"
                                  size="sm"
                                  className=""
                                  role="status"
                                  aria-hidden="true"
                                />
                              )}
                              Appointment Now
                            </div>
                          </button>
                          }
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
                <div className="col-xl-7 col-lg-6 col-md-6 col-sm-12">
                  <div className="appointment-thumb">
                    <img src={MobileImg} />
                    <div className="images-group">
                      <img className="img1" src={WomanImg} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};


export default Appointment;
