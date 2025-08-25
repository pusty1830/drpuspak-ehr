// src/components/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-green-900 text-white py-6 print:bg-white print:text-black print:border-t print:border-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left print:grid-cols-3 print:gap-4 print:max-w-none print:px-4">
        {/* Address */}
        <div className="print:text-left">
          <h3 className="font-semibold text-lg print:text-base print:font-bold">Address :</h3>
          <p className="print:text-sm">B-31, HIG Duplex Baramunda</p>
          <p className="print:text-sm">Bhubaneswar, 751003</p>
        </div>

        {/* Contact */}
        <div className="print:text-center">
          <h3 className="font-semibold text-lg print:text-base print:font-bold">Contact</h3>
          <p className="print:text-sm">7873366631</p>
          <p className="print:text-sm">7873366632</p>
        </div>

        {/* Web */}
        <div className="print:text-right">
          <h3 className="font-semibold text-lg print:text-base print:font-bold">Web:</h3>
          <p className="print:text-sm break-words">info.orthospinecare@gmail.com</p>
          <p className="print:text-sm break-words">www.orthospinecare.org</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;