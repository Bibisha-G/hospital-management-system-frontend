import { Modal } from "react-bootstrap";
import './DoctorModal.css'
import { useEffect, useState } from "react";
import { useLazyGetDepartmentInfoQuery } from "../../features/department/departmentApiSlice";
function DoctorModal({ show, onHide, profileImg, doctor }) {
    const [getDepartmentInfo, {isLoading}] = useLazyGetDepartmentInfoQuery()
    const [dept, setDept] = useState()
    useEffect(() => {
        let deptInfo = async(id) => {
            let response = await getDepartmentInfo(id).unwrap();
            console.log(response);
            setDept(response)
        } 
        doctor && deptInfo(doctor.department)
    }, [doctor])

    console.log(doctor);
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            fullscreen={true}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Modal heading
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <div className="doctor">
                    <div className="doctor-img">
                        <img src={profileImg} />
                    </div>
                    <div className="doctor-info">
                        <div className="doctor-info-comntent">
                            <h4 className="title">{doctor?.user?.name}</h4>
                            <h4 className="text-secondary">{doctor?.age}</h4>
                            {isLoading? (
                              <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                              </div>
                            ) : (
                                <h4 className="text-secondary">{dept?.name}</h4>
                            )}
                            <span className="text-secondary">{doctor?.specialization}</span>

                        </div>
                    </div>
                </div>

                <p>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                    dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                    consectetur ac, vestibulum at eros.
                </p>
            </Modal.Body>
            {/* <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer> */}
        </Modal>
    );
}
export default DoctorModal;