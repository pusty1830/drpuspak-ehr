import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaHeartPulse,
  FaArrowUp,
} from "react-icons/fa6";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // Show scroll-to-top button when user scrolls down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-gray-800 text-white pt-16 pb-10 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 rounded-full filter blur-xl animate-pulse-slow"></div>
      <div className="absolute -bottom-20 -right-10 w-60 h-60 bg-primary/5 rounded-full filter blur-xl animate-pulse-slower"></div>
      
      {/* Scroll to top button */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed z-50 bottom-6 right-6 w-12 h-12 rounded-full bg-primary hover:bg-primary-dark text-white flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 animate-bounce"
          aria-label="Scroll to top"
        >
          <FaArrowUp />
        </button>
      )}

      <div className="relative container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Newsletter */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6 transform hover:scale-105 transition-transform duration-300">
              <div className="relative">
                <div className="absolute -inset-2 bg-primary/20 rounded-full blur-sm"></div>
                <FaHeartPulse className="text-primary text-4xl mr-3 relative z-10" />
              </div>
              <h4 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                Prof Dr Puspak Samal
              </h4>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Best Orthopedic Surgeon in Bhubaneswar / Joint Replacement / Spine
              Surgeon in Bhubaneswar
            </p>

            <div className="flex space-x-3">
              {[
                { icon: FaFacebookF, color: "hover:bg-blue-600" },
                { icon: FaTwitter, color: "hover:bg-blue-400" },
                { icon: FaYoutube, color: "hover:bg-red-600" },
                { icon: FaInstagram, color: "hover:bg-pink-600" },
              ].map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className={`w-10 h-10 flex items-center justify-center rounded-full border border-gray-700 bg-gray-800 text-white transition-all duration-300 transform hover:-translate-y-1 ${social.color}`}
                  aria-label={`Follow on ${social.icon.name}`}
                >
                  <social.icon />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h5 className="font-bold text-lg mb-4 relative inline-block pb-2 group">
              Company
              <span className="absolute bottom-0 left-0 w-10 h-0.5 bg-primary"></span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all duration-500 group-hover:w-full"></span>
            </h5>
            <ul className="mt-6 space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "About Us", path: "/about" },
                { name: "Testimonial", path: "/testimonial" },
                { name: "Blogs", path: "/blog" },
              ].map((link, index) => (
                <li key={index} className="group">
                  <Link
                    to={link.path}
                    className="flex items-center text-gray-300 hover:text-primary transition-all duration-300 transform hover:translate-x-2"
                  >
                    <span className="w-1 h-1 bg-primary rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h5 className="font-bold text-lg mb-4 relative inline-block pb-2 group">
              Contact
              <span className="absolute bottom-0 left-0 w-10 h-0.5 bg-primary"></span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all duration-500 group-hover:w-full"></span>
            </h5>
            <div className="mt-6 space-y-4">
              <p className="flex items-start text-gray-300">
                <svg
                  className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
                B13, HIG Duplex BDA Colony, RBI Colony, Baramunda, Bhubaneswar,
                Odisha 751003
              </p>
              <p className="flex items-center text-gray-300">
                <svg
                  className="w-5 h-5 text-primary mr-3 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  ></path>
                </svg>
                <span className="truncate">drpuspak@gmail.com</span>
              </p>
              <p className="flex items-center text-gray-300">
                <svg
                  className="w-5 h-5 text-primary mr-3 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  ></path>
                </svg>
                7873366631
              </p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-gray-800/50 p-6 rounded-lg border-l-4 border-primary transform hover:-translate-y-1 transition-transform duration-300">
            <h5 className="font-bold text-lg mb-4 relative inline-block pb-2">
              DISCLAIMER
            </h5>
            <p className="text-gray-300 text-sm leading-relaxed mt-4">
              All information contained on this website is intended for
              informational and educational purposes. The content is not intended
              to be a substitute for professional medical advice.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 border-t border-gray-700 relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 -top-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
            <FaHeartPulse className="text-white text-xs" />
          </div>
        </div>

        {/* Copyright and Terms */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm mb-4 md:mb-0">
            © <span className="text-primary font-medium">Dr Puspak Samal</span> {currentYear}. All Rights Reserved.
          </p>
          
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-gray-400 hover:text-primary text-sm transition-colors duration-300"
            >
              Terms of use
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-primary text-sm transition-colors duration-300"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-primary text-sm transition-colors duration-300"
            >
              Environmental Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;