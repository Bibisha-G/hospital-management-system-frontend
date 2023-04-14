import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../../assets/download.png";
import { FaSearch } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { selectUserType } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

function NavBar() {
  const [scrollDirection, setScrollDirection] = useState("none");

  const user = useSelector(selectUserType);
  const [navbarOpacity, setNavbarOpacity] = useState(1);

  // useEffect(() => {
  //   function handleScroll() {
  //     var navbar = document.querySelector("nav");
  //     if (window.pageYOffset >= 20) {
  //       navbar.classList.add("sticked");
  //     } else {
  //       navbar.classList.remove("sticked");
  //     }
  //     if (window.pageYOffset > window.lastScrollTop) {
  //       setScrollDirection("down");
  //       setNavbarOpacity(0);
  //     } else if (window.pageYOffset < window.lastScrollTop) {
  //       setScrollDirection("up");
  //       setNavbarOpacity(1);
  //     } else {
  //       setScrollDirection("none");
  //     }
  //     window.lastScrollTop = window.pageYOffset;
  //   }
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  return (
    <div>
      <Navbar
        expand="lg"
        sticky="top"
        style={{ opacity: navbarOpacity }}
        className="nav-transition"
      >
        <Container fluid>
          <Link to={"/"} className="navbar-brand">
            <h1>HMS</h1>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <div className="align-nav">
              <Nav className="me-auto">
                <Link to={"/"} className="nav-link">
                  Home
                </Link>
                <Link to={"/about"} className="nav-link">
                  About Us
                </Link>
                {/* <NavDropdown title="Services" id="basic-nav-dropdown">
              <Link to={"/service"} className='dropdown-item'>Service</Link>
              <Link to={"/servicedetails"} className='dropdown-item'>
                Service Details
              </Link>
            </NavDropdown> */}
                <Link to={"/Contact"} className="nav-link">
                  Contact Us
                </Link>
              </Nav>
              <Nav className="ms-auto">
                {user ? (
                  <>
                    <div className="nav-link nav-link-buttons-margin">
                      <Link to={"/dashboard"}>
                        <button type="button">
                          Dashboard{" "}
                          <span>
                            {" "}
                            <IoIosArrowForward />{" "}
                          </span>
                        </button>
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    <NavDropdown title="Sign Up" id="basic-nav-dropdown">
                      <Link to={"/register_patient"} className="dropdown-item">
                        Patient
                      </Link>
                      <Link to={"/register_doctor"} className="dropdown-item">
                        Doctor
                      </Link>
                    </NavDropdown>
                    <div className="nav-link nav-link-buttons-margin">
                      <Link to={"/login"}>
                        <button type="button">
                          Login{" "}
                          <span>
                            {" "}
                            <IoIosArrowForward />{" "}
                          </span>
                        </button>
                      </Link>
                    </div>
                  </>
                )}
              </Nav>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;
