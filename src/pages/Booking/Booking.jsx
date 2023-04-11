import React from 'react'
import Appointment from '../../components/Appointment/Appointment'
import './Booking.css';
import { FiHome } from "react-icons/fi";
import { Link } from 'react-router-dom';

function Booking() {
    return (
        <div>
            <div className="banner-wraper">
                <div className="page-banner">
                    <div className="container">
                        <div className="page-banner-entry text-center">
                            <h1>Booking</h1>
                            <nav aria-label="breadcrumb" className="breadcrumb-row">
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to={"/"}>
                                            <FiHome />
                                            Home
                                        </Link>
                                    </li>
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
            <Appointment/>
        </div>
    )
}

export default Booking