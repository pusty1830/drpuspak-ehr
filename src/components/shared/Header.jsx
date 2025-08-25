import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { getUserRole, isLoggedIn, logout } from "../../services/axiosClient";

const Navbar = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const location = useLocation();

  const toggleDrawer = () => setShowDrawer(!showDrawer);

  useEffect(() => {
    const header = document.querySelector(".fixed-header");
    if (header) {
      setHeaderHeight(header.offsetHeight);
    }
  }, []);

  useEffect(() => {
    setShowDrawer(false);
  }, [location]);

  // ✅ Role based nav links
  const navLinksByRole = {
    doctor: [
      { label: "Home", path: "/" },
      { label: "Doctor Dashboard", path: "/doctor/dashboard/" },
      { label: "Download Reminder Data", path: "/doctor/dashboard/" },
    ],
    admin: [
      { label: "Home", path: "/" },
      { label: "Admin Dashboard", path: "/admin" },
      { label: "Doctors", path: "/admin" },
      { label: "Download Reminder Data", path: "/doctor/dashboard/" },
    ],
    user: [
      { label: "Home", path: "/" },
      { label: "Doctor Dashboard", path: "/doctor/dashboard/" },
      { label: "Admin Dashboard", path: "/admin" },
    ],
  };

  const userRole = getUserRole()?.toLowerCase(); // "doctor" | "admin" | "user"
  const navLinks = navLinksByRole[userRole] || navLinksByRole.user;

  return (
    <>
      {/* Fixed Header */}
      <div className="w-full fixed top-0 left-0 z-50">
        {/* Top Blue & Black Header */}
        <div className="hidden sm:flex text-white text-sm">
          <div className="bg-blue-600 py-2 px-4 flex items-center w-[60%]">
            <i className="bi bi-telephone-fill mr-2"></i>
            Help Line:
            <b className="ml-1">
              <i>+91 7873366631</i>
            </b>
            <span className="mx-3">|</span>
            <i className="bi bi-clock-fill mr-2"></i>
            Open Hours: Mon - Fri 7.30 am - 8.00 pm
          </div>
          <div className="bg-black py-1 px-5 flex items-center w-[40%]">
            <i className="bi bi-envelope-fill mr-2"></i>
            <a
              href="mailto:info@example.com"
              className="text-white no-underline"
            >
              drpuspak@gmail.com
            </a>
          </div>
        </div>

        {/* White Pill Navbar */}
        <div className="fixed-header mx-0 lg:mx-5 bg-white shadow rounded-md">
          <div className="px-4 py-3 flex justify-between items-center rounded-full">
            {/* Logo */}
            <Link
              className="flex items-center font-bold no-underline text-gray-800"
              to="/"
            >
              <i className="bi bi-heart-pulse-fill text-blue-600 text-xl mr-2"></i>
              <span className="text-lg">Dr Puspak Samal</span>
            </Link>

            {/* Nav Links (Desktop) */}
            <div className="hidden lg:flex items-center flex-grow justify-between ml-1">
              <ul className="flex space-x-6">
                {navLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link className="hover:text-blue-600" to={link.path}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div>
                {isLoggedIn() ? (
                  <button
                    className="bg-green-600 hover:bg-green-700 text-white rounded-full px-6 py-2 uppercase font-semibold"
                    onClick={() => logout()}
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    className="bg-green-600 hover:bg-green-700 text-white rounded-full px-6 py-2 uppercase font-semibold"
                    to="/login"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>

            {/* Toggle for Mobile */}
            <div className="lg:hidden">
              <button
                onClick={toggleDrawer}
                className="text-gray-800 focus:outline-none"
              >
                {showDrawer ? (
                  <FiX className="text-3xl transition-transform duration-300" />
                ) : (
                  <FiMenu className="text-3xl transition-transform duration-300" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div style={{ height: `${headerHeight}px` }}></div>

      {/* Overlay */}
      {showDrawer && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={toggleDrawer}
        ></div>
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 bg-white mt-10 shadow-lg p-6 h-full transform transition-transform duration-300 ease-in-out ${
          showDrawer ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ width: "270px", zIndex: 1050 }}
      >
        <ul className="flex flex-col space-y-4 font-medium">
          {navLinks.map((link, idx) => (
            <li key={idx}>
              <Link className="hover:text-blue-600" to={link.path}>
                {link.label}
              </Link>
            </li>
          ))}

          <li className="mt-5">
            <Link
              className="bg-green-600 hover:bg-green-700 text-white w-full block text-center py-2 rounded-full"
              to="/appointment"
            >
              BOOK AN APPOINTMENT
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
