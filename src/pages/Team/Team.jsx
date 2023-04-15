import { FiHome } from "react-icons/fi";
import { FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import member4 from '../../assets/doctor4.jpg';
import { Link, useLocation } from 'react-router-dom';
import { useGetDoctorsQuery } from "../../features/doctor/doctorApiSlice";
import { Pagination, Spinner } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Team() {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetDoctorsQuery()
  const breadcrumbs = location.pathname.split('/')
  const goToDetails = (id) => {
    navigate(`/dashboard/doctors/${id}`);
  }

  const pageSize = 10;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const filteredData = data && data.filter((doctor) => {
    const name = doctor?.specialization.toLowerCase();
    return name?.includes(searchQuery.toLowerCase())
  })

  const totalPages = Math.ceil((filteredData?.length || 0) / pageSize);
  const doctorsToShow = filteredData?.slice(startIndex, endIndex);
  return <div>
    <div className="banner-wraper">
      <div className="page-banner">
        <div className="container">
          <div className="page-banner-entry text-center">
            <h1>Our Doctors</h1>
            <nav aria-label="breadcrumb" className="breadcrumb-row">
              <ul className="breadcrumb">
                {breadcrumbs && breadcrumbs.length > 2 ?
                  <li className="breadcrumb-item">
                    <Link to={"/dashboard"}>
                      <FiHome />
                      Dashboard
                    </Link>
                  </li> :
                  <li className="breadcrumb-item">
                    <Link to={"/"}>
                      <FiHome />
                      Home
                    </Link>
                  </li>
                }
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
        <div className="col-12 mb-4 d-flex justify-content-center">
          <div className="col-6 mb-4">
            <input
              type="text"
              placeholder="Search for a doctor"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-control"
            />
          </div>
        </div>
        {isLoading ? (
          <div className="d-flex gap-2 px-4 justify-content-center align-items-center text-white">
            <Spinner
              as="span"
              animation="border"
              size="sm"
              className=""
              role="status"
              aria-hidden="true"
            />
          </div>
        ) : (
          <>
          {doctorsToShow && doctorsToShow.map((doctor, idx) => (
            <div className="col-lg-4 col-sm-6 mb-30" key={doctor.id} onClick={() => goToDetails(doctor.id)}>
              <div className="team-member">
                <div className="team-media">
                  <img src={member4} />
                </div>
                <div className="team-info">
                  <div className="team-info-comntent">
                    <h4 className="title">{doctor.user?.name}</h4>
                    <span className="text-secondary">{doctor.specialization}</span>
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
            ))}
            <div className="d-flex justify-content-center">
              <Pagination>
                {[...Array(totalPages)].map((_, i) => (
                  <Pagination.Item key={i} active={i + 1 === page} onClick={() => setPage(i + 1)}>
                    {i + 1}
                  </Pagination.Item>
                ))}
              </Pagination>
            </div>
          </>
        )}
      </div>
    </div>
  </div>
}


export default Team;
