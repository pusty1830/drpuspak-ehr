import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaHeartPulse,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="relative bg-gray-900 text-white pt-10 pb-6">
      {/* Overlay (if you want gradient feel) */}
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="relative container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Newsletter */}
          <div>
            <div className="flex items-center mb-4">
              <FaHeartPulse className="text-primary text-3xl mr-2" />
              <h4 className="text-lg font-bold">Prof Dr Puspak Samal</h4>
            </div>
            <p className="text-gray-300 mb-4">
              Best Orthopedic Surgeon in Bhubaneswar / Joint Replacement / Spine
              Surgeon in Bhubaneswar
            </p>

            <div className="flex space-x-3">
              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-400 hover:bg-primary hover:text-white transition"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-400 hover:bg-primary hover:text-white transition"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-400 hover:bg-primary hover:text-white transition"
              >
                <FaYoutube />
              </a>
              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-400 hover:bg-primary hover:text-white transition"
              >
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h5 className="font-bold border-b border-primary pb-2">Company</h5>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/" className="hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/testimonial" className="hover:text-primary">
                  Testimonial
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-primary">
                  Blogs
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="font-bold border-b border-primary pb-2">Contact</h5>
            <p className="mt-4 text-gray-300">
              B13, HIG Duplex BDA Colony, RBI Colony, Baramunda, Bhubaneswar,
              Odisha 751003
            </p>
            <p className="mt-2 text-gray-300">
              <strong>Email Us:</strong> drpuspak@gmail.com
            </p>
            <p className="mt-2 text-gray-300">
              <strong>Call Now:</strong> 7873366631
            </p>
          </div>

          {/* Disclaimer */}
          <div>
            <h5 className="font-bold border-b border-primary pb-2">
              DISCLAIMER
            </h5>
            <p className="mt-4 text-gray-300 text-sm">
              All information contained on this website is intended for
              informational and educational purposes.
            </p>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-6 border-gray-600" />

        {/* Copyright */}
        <div className="text-center text-gray-300">
          <p>
            © <span className="text-primary">Dr Puspak Samal</span> 2025. All
            Rights Reserved.
          </p>
        </div>

        {/* Terms */}
        <div className="mt-4 text-center text-sm text-gray-400 space-x-4">
          <a href="#" className="hover:text-primary">
            Terms of use
          </a>
          <a href="#" className="hover:text-primary">
            Privacy Environmental Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
