import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../../assets/download.png';
import { FaSearch } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from 'react-router-dom';
import './NavBar.css'
window.onscroll = function () { myFunction() };

var navbar = document.querySelector("nav");

function myFunction() {
  if (window.pageYOffset >= 20) {
    navbar.classList.add("sticked")
  } else {
    navbar.classList.remove("sticked");
  }
}

function NavBar() {

  return <div>
    <Navbar expand="lg">
      <Container fluid>
        <Link to={"/"} className='navbar-brand'>
          <h1>HMS</h1>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to={'/'} className='nav-link'>Home</Link>
            <Link to={"/booking"} className='nav-link'>
                Booking
              </Link>
            {/* <NavDropdown title="Services" id="basic-nav-dropdown">
              <Link to={"/service"} className='dropdown-item'>Service</Link>
              <Link to={"/servicedetails"} className='dropdown-item'>
                Service Details
              </Link>
            </NavDropdown> */}
            <Link to={"/doctors"} className='nav-link'>
              Our Doctors
            </Link>
            <Link to={"/Contact"} className='nav-link'>Contact Us</Link>
            <Nav.Link> <FaSearch /> </Nav.Link>
            <NavDropdown title="Sign Up" id="basic-nav-dropdown">
              <Link to={"/signup"} className='dropdown-item'>Sign Up</Link>
              <Link to={"/signupdoctor"} className='dropdown-item'>
                Sign Up for Doctor
              </Link>
            </NavDropdown>
            <Link to="/login" className='nav-link nav-link-buttons-margin'>
              <Link to={'/login'}><button type='button'>Login <span> <IoIosArrowForward /> </span></button></Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </div>
}

export default NavBar; 