import { FiHome } from "react-icons/fi";
import abouti1 from '../../assets/about1.jpg';
import abouti2 from '../../assets/about2.jpg';
import abouti3 from '../../assets/about3.jpg';
import { FaAmbulance, FaBed, FaSyringe } from "react-icons/fa";
import { IoWater } from "react-icons/io5";
import { Link, useLocation } from 'react-router-dom';
import TopDoctors from "../../components/TopDoctors/TopDoctors";
import './AboutUs.css'
function AboutUs() {
    const location = useLocation()
    const breadcrumbs = location.pathname.split('/')
    return <div>
        <div className="banner-wraper">
            <div className="page-banner">
                <div className="container">
                    <div className="page-banner-entry text-center">
                        <h1>About Us</h1>
                        <nav aria-label="breadcrumb" className="breadcrumb-row">
                            <ul className="breadcrumb">
                            {breadcrumbs && breadcrumbs.length > 2 ?
                                <li className="breadcrumb-item">
                                    <Link to={"/dashboard"}>
                                        <FiHome />
                                        Dashboard
                                    </Link>
                                </li>:
                                <li className="breadcrumb-item">
                                    <Link to={"/"}>
                                        <FiHome />
                                        Home
                                    </Link>
                                </li>
                            }
                                <li className="breadcrumb-item active" aria-current="page">
                                    About Us
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <section className="section about-area">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-lg-6 mb-30">
                            <div className="about-images">
                                <ul>
                                    <li>
                                        <img className='img1' src={abouti1} />
                                    </li>
                                    <li>
                                        <img className='img2' src={abouti2} />
                                    </li>
                                    <li>
                                        <img className='img3' src={abouti3} />
                                    </li>
                                    <li>
                                        <div className='exp-bx'>
                                            20
                                            <span>Year Experience</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='col-lg-6 mb-30'>
                            <div className='heading-bx'>
                                <h6>About Us</h6>
                                <h2 className='title'>The Great Place Of Medical Hospital Center</h2>
                                <p>We provide the special tips and advice’s
                                    of heath care treatment and high level of best
                                    technology involve in the our hospital.</p>
                            </div>
                            <div className='row'>
                                <div className='col-lg-6 col-sm-6 mb-30'>
                                    <div className='feature1'>
                                        <div className='icon-md'>
                                            <span className='icon-cell'>
                                                <FaAmbulance />
                                            </span>
                                        </div>
                                        <div className='icon-content'>
                                            <h4>Emergency Help</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-lg-6 col-sm-6 mb-30'>
                                    <div className='feature1'>
                                        <div className='icon-md'>
                                            <span className='icon-cell'>
                                                <FaBed />
                                            </span>
                                        </div>
                                        <div className='icon-content'>
                                            <h4>Qualified Doctors</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-lg-6 col-sm-6 mb-30'>
                                    <div className='feature1'>
                                        <div className='icon-md'>
                                            <span className='icon-cell'>
                                                <IoWater />
                                            </span>
                                        </div>
                                        <div className='icon-content'>
                                            <h4>Best Professionals</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-lg-6 col-sm-6 mb-30'>
                                    <div className='feature1'>
                                        <div className='icon-md'>
                                            <span className='icon-cell'>
                                                <FaSyringe />
                                            </span>
                                        </div>
                                        <div className='icon-content'>
                                            <h4>Medical Treatment</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Link to={'/about'} className='btn btn-primary shadow'>Read More</Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <div>
            <section className="section-sp1 service-wraper2">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-3 col-sm-6 mb-30">
                            <div className="feature-container feature-bx3">
                                <h2 className="counter">120</h2>
                                <h5 className="ttr-title">Years With You</h5>
                            </div>
                        </div>
                        <div className="col-xl-3 col-sm-6 mb-30">
                            <div className="feature-container feature-bx3">
                                <h2 className="counter">400</h2>
                                <h5 className="ttr-title">Awards</h5>
                            </div>
                        </div>
                        <div className="col-xl-3 col-sm-6 mb-30">
                            <div className="feature-container feature-bx3">
                                <h2 className="counter">250</h2>
                                <h5 className="ttr-title">Doctors</h5>
                            </div>
                        </div>
                        <div className="col-xl-3 col-sm-6 mb-30">
                            <div className="feature-container feature-bx3">
                                <h2 className="counter">800</h2>
                                <h5 className="ttr-title">Satisfied Client</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <TopDoctors />
    </div>
}

export default AboutUs;