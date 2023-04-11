import { FiHome } from "react-icons/fi";
import { FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import member4 from '../../assets/doctor4.jpg';
import member5 from '../../assets/doctor5.jpg';
import member6 from '../../assets/doctor6.jpg';
import { Link } from 'react-router-dom';

function Team() {
    return <div>
        <div className="banner-wraper">
            <div className="page-banner">
                <div className="container">
                    <div className="page-banner-entry text-center">
                        <h1>Our Doctors</h1>
                        <nav aria-label="breadcrumb" className="breadcrumb-row">
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to={"/"}>
                                        <FiHome />
                                        Home
                                    </Link>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">
                                    Our Doctors
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
        <div className='container'>
            <div className="row justify-content-center">
                <div className="col-lg-4 col-sm-6 mb-30">
                    <div className="team-member">
                        <div className="team-media">
                            <img src={member4} />
                        </div>
                        <div className="team-info">
                            <div className="team-info-comntent">
                                <h4 className="title">Dr. Addition Smith</h4>
                                <span className="text-secondary">Dentist</span>
                            </div>
                            <ul className="social-media">
                                <li>
                                    <Link to={"twitter.com"}>
                                        <FaTwitter />
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"instagram.com"}>
                                        <FaInstagram />
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"linkedin.com"}>
                                        <FaLinkedin />
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-sm-6 mb-30">
                    <div className="team-member">
                        <div className="team-media">
                            <img src={member5} />
                        </div>
                        <div className="team-info">
                            <div className="team-info-comntent">
                                <h4 className="title">Dr. Mahfuz Riad</h4>
                                <span className="text-secondary">Chiropractor</span>
                            </div>
                            <ul className="social-media">
                                <li>
                                    <Link to={"twitter.com"}>
                                        <FaTwitter />
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"instagram.com"}>
                                        <FaInstagram />
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"linkedin.com"}>
                                        <FaLinkedin />
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-sm-6 mb-30">
                    <div className="team-member">
                        <div className="team-media">
                            <img src={member6} />
                        </div>
                        <div className="team-info">
                            <div className="team-info-comntent">
                                <h4 className="title">Dr. David Benjamin</h4>
                                <span className="text-secondary">Cardiologist</span>
                            </div>
                            <ul className="social-media">
                                <li>
                                    <Link to={"twitter.com"}>
                                        <FaTwitter />
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"instagram.com"}>
                                        <FaInstagram />
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"linkedin.com"}>
                                        <FaLinkedin />
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}


export default Team;
