// src/components/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-green-900 text-white py-6">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
        {/* Address */}
        <div>
          <h3 className="font-semibold text-lg">Address :</h3>
          <p>B-31, HIG Duplex Baramunda</p>
          <p>Bhubaneswar, 751003</p>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold text-lg">Contact</h3>
          <p>7873366631</p>
          <p>7873366632</p>
        </div>

        {/* Web */}
        <div>
          <h3 className="font-semibold text-lg">Web:</h3>
          <p>info.orthospinecare@gmail.com</p>
          <p>www.orthospinecare.org</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
