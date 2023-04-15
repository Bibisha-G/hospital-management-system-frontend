import React from 'react'
import Appointment from '../../components/Appointment/Appointment'
import './Booking.css';
import { FiHome } from "react-icons/fi";
import { Link, useLocation } from 'react-router-dom';

function Booking() {
    const location = useLocation()
    const breadcrumbs = location.pathname.split('/')
    const dept_id = location.state?.dept_id || ""
    const doctor_id = location.state?.doctor_id || ""
    console.log(dept_id,doctor_id);
    return (
        <div>
            <div className="banner-wraper">
                <div className="page-banner">
                    <div className="container">
                        <div className="page-banner-entry text-center">
                            <h1>Booking</h1>
                            <nav aria-label="breadcrumb" className="breadcrumb-row">
                                <ul className="breadcrumb">
                                    {breadcrumbs && breadcrumbs.length > 2 ?
                                        <li className="breadcrumb-item">
                                            <Link to={"/dashboard"}>
                                                <FiHome />
                                                Dashboard
                                            </Link>
                                        </li>
                                        :
                                        <li className="breadcrumb-item">
                                            <Link to={"/"}>
                                                <FiHome />
                                                Home
                                            </Link>
                                        </li>
                                    }
                                    <li className="breadcrumb-item active" aria-current="page">
                                        Booking
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <div className='margn'></div>

            <Appointment dept_id={dept_id} doctor_id={doctor_id}/>
        </div>
    )
}

export default Booking