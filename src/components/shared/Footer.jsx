import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer-section text-light pt-5 pb-4 position-relative">
      <div className="footer-overlay position-absolute top-0 start-0 w-100 h-100"></div>

      <div className="container position-relative">
        <div className="row">
          {/* Logo and Newsletter */}
          <div className="col-md-4 mb-4">
            <div className="d-flex align-items-center mb-3">
              <i className="bi bi-heart-pulse-fill text-primary fs-3 me-2"></i>
              <h4 className="mb-0 fw-bold">Prof Dr Puspak Samal</h4>
            </div>
            <p className="text-light">
              Best Orthopedic Surgeon in Bhubaneswar/Joint Replacement/Spine
              Surgeon in Bhubaneswar
            </p>

            <div className="d-flex gap-2">
              <a href="#" className="btn btn-outline-light rounded-circle">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="btn btn-outline-light rounded-circle">
                <i className="bi bi-twitter-x"></i>
              </a>
              <a href="#" className="btn btn-outline-light rounded-circle">
                <i className="bi bi-youtube"></i>
              </a>
              <a href="#" className="btn btn-outline-light rounded-circle">
                <i className="bi bi-instagram"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}

          {/* Company */}
          <div className="col-md-2 mb-4">
            <h5 className="fw-bold border-bottom border-primary pb-2">
              Company
            </h5>
            <ul className="list-unstyled mt-3">
              <li>
                <Link to="/" className="text-light text-decoration-none">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-light text-decoration-none">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/testimonial"
                  className="text-light text-decoration-none"
                >
                  Testimonial
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-light text-decoration-none">
                  Blogs
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold border-bottom border-primary pb-2">
              Contact
            </h5>
            <p className="text-light mt-3">
              B13, HIG Duplex BDA Colony, RBI Colony, Baramunda, Bhubaneswar,
              Odisha 751003
            </p>
            <p className="text-light">
              <strong>Email Us</strong>
              <br />
              drpuspak@gmail.com
            </p>
            <p className="text-light">
              <strong>Call Now</strong>
              <br />
              7873366631
            </p>
          </div>
          <div className="col-md-2 mb-4">
            <h5 className="fw-bold border-bottom border-primary pb-2">
              DISCLAIMER
            </h5>
            <p class="text-white">
              All information contained on this website is intended for
              informational and educational purposes.
            </p>
          </div>
        </div>

        <hr className="border-light opacity-25" />

        <div className="text-center">
          <div className="">
            <p className="mb-0 text-light">
              © <span className="text-primary">Dr Puspak Samal</span> 2025. All
              Rights Reserved.
            </p>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col text-center text-light small">
            <a
              href="#"
              className="text-light me-3"
              style={{ textDecoration: "none" }}
            >
              Terms of use
            </a>
            <a
              href="#"
              className="text-light"
              style={{ textDecoration: "none" }}
            >
              Privacy Environmental Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
