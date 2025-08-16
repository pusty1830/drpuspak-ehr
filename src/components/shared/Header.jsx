import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

const Navbar = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const location = useLocation();

  const toggleDrawer = () => setShowDrawer(!showDrawer);

  useEffect(() => {
    // Adjust page content padding based on header height
    const header = document.querySelector(".fixed-header");
    if (header) {
      setHeaderHeight(header.offsetHeight);
    }
  }, []);

  // Close drawer automatically when route changes
  useEffect(() => {
    setShowDrawer(false);
  }, [location]);

  return (
    <>
      {/* Fixed Header */}
      <div className="w-100 position-fixed top-0 start-0 z-3">
        {/* Top Blue & Black Header */}
        <div className="top-header bg-dark d-flex text-white small d-none d-sm-flex">
          <div
            className="bg-primary py-2 px-4 d-flex align-items-center diagonal-left"
            style={{ flex: "0 0 60%" }}
          >
            <i className="bi bi-telephone-fill me-2"></i>
            Help Line:{" "}
            <b className="ms-1">
              <i>+91 7873366631</i>
            </b>
            <span className="mx-3">|</span>
            <i className="bi bi-clock-fill me-2"></i>
            Open Hours: Mon - Fri 7.30 am - 8.00 pm
          </div>
          <div
            className="bg-dark py-1 px-5 d-flex align-items-center diagonal-center"
            style={{ flex: "0 0 40%" }}
          >
            <i className="bi bi-envelope-fill me-2"></i>
            <a
              href="mailto:info@example.com"
              className="text-white text-decoration-none"
            >
              drpuspak@gmail.com
            </a>
          </div>
        </div>

        {/* White Pill Navbar */}
        <div className="fixed-header ms-sm-0 ms-md-0 ms-lg-5 me-sm-0 me-md-0 me-lg-5 bg-white shadow rounded-2">
          <div>
            <div className="navbar-pill px-4 py-3 d-flex justify-content-between align-items-center rounded-pill">
              {/* Logo */}
              <Link
                className="navbar-brand fw-bold d-flex align-items-center text-decoration-none"
                to="/"
              >
                <i className="bi bi-heart-pulse-fill text-primary fs-4 me-2"></i>
                <span className="fs-5">Dr Puspak Samal</span>
              </Link>

              {/* Nav Links (Desktop) */}
              <div className="d-none d-lg-flex align-items-center flex-grow-1 justify-content-between ms-1">
                <ul className="nav">
                  <li className="nav-item">
                    <Link className="nav-link" to="/">
                      Home
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="/doctor/dashboard/">
                      Doctor
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/contact">
                      Admin
                    </Link>
                  </li>
                </ul>

                <div className="d-flex align-items-center">
                  <Link
                    className="btn btn-success rounded-pill px-4 text-uppercase fw-semibold"
                    to="/appointment"
                  >
                    Login
                  </Link>
                </div>
              </div>

              {/* Toggle for Mobile */}
              <div className="d-lg-none">
                <button className="btn" onClick={toggleDrawer}>
                  <i className="bi bi-list fs-2"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Page Content Spacer */}
      <div style={{ height: `${headerHeight}px` }}></div>

      {/* Mobile Drawer */}
      <div
        className={`mobile-drawer position-fixed top-0 end-0 bg-white shadow p-4 h-100 ${
          showDrawer ? "open" : ""
        }`}
        style={{ width: "250px", zIndex: 1050 }}
      >
        <button className="btn-close mb-4" onClick={toggleDrawer}></button>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about">
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/cranial">
              Cranial
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/spinal">
              Spinal
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/testimonial">
              Testimonial
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/blog">
              Blogs
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contact">
              Contact
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/reminder">
              Reminder
            </Link>
          </li>
          <li className="nav-item mt-3">
            <Link className="btn btn-success w-100" to="/appointment">
              BOOK A APPOINTMENT
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
