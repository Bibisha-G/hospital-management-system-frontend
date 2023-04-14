import MobileImg from "../../assets/mobile.png";
import WomanImg from "../../assets/womenCartoon.png";
import "./Appointment.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import { useLazyGetDepartmentsQuery } from "../../features/department/departmentApiSlice";

function Appointment() {
  const [departments, setDepartments] = useState()
  const [getDepartments, { isLoading }] = useLazyGetDepartmentsQuery()

  useEffect(() => {
    let getData = async () => {
      let response = await getDepartments().unwrap();
      console.log(response);
      setDepartments(response);
    }
    getData()
  }, [])

  const initialValues = {
    department: "",
    doctor: "",
    name: "",
    phone: "",
    date: "",
  };

  const onSubmit = (values) => {
    console.log(values);
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
                    <Formik initialValues={initialValues} onSubmit={onSubmit}>
                      {({ values, handleChange, handleBlur }) => (
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
                                className="form-select form-control"
                                placeholder="Select Department"
                                value={values.department}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                <option disabled value="" hidden>Select Department</option>
                                {departments && departments.map((dep) => (
                                  <option value={dep.name} key={dep.id}>{dep.name}</option>

                                ))}
                              </Field>
                            )}
                          </div>
                          <div className="form-group">
                            <Field
                              name="doctor"
                              as="select"
                              className="form-select form-control"
                              value={values.doctor}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            >
                              <option>Select Doctor</option>
                              <option value={1}>One</option>
                              <option value={2}>Two</option>
                              <option value={3}>Three</option>
                            </Field>
                          </div>
                          <div className="form-group">
                            <Field
                              name="name"
                              type="text"
                              className="form-control"
                              placeholder="Your Name"
                              value={values.Name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                          <div className="form-group">
                            <Field
                              name="phone"
                              type="number"
                              className="form-control"
                              placeholder="Phone Numbers"
                              value={values.phone}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                          <div className="form-group">
                            <Field
                              name="date"
                              type="date"
                              className="form-control"
                              value={values.date}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                          <button
                            type="submit"
                            className="btn btn-secondary btn-lg"
                          >
                            Appointment Now
                          </button>
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
