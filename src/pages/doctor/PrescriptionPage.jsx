// src/pages/doctor/PrescriptionPage.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import Header from "./PrescriptionComp/Header";
import { div } from "framer-motion/client";
import Footer from "./PrescriptionComp/Footer";

const PrescriptionPage = () => {
  const location = useLocation();
  const { prescription } = location.state || {};

  return (
    <div className=" flex justify-center items-center m-4">
        
    <div className="flex flex-col  mt-10 max-w-3xl ">
      {/* ====== HEADER ====== */}
      <Header/>

      <div className="flex flex-1 min-h-[650px] ">
        {/* ====== SIDEBAR ====== */}
        <aside className="w-54 bg-gray-800 text-white p-5 hidden md:block">
          <h2 className="text-lg font-semibold mb-4">Menu</h2>
          <ul className="space-y-3">
            <li className="hover:text-blue-400 cursor-pointer">Dashboard</li>
            <li className="hover:text-blue-400 cursor-pointer">Patients</li>
            <li className="hover:text-blue-400 cursor-pointer">Prescriptions</li>
            <li className="hover:text-blue-400 cursor-pointer">Appointments</li>
            <li className="hover:text-blue-400 cursor-pointer">Settings</li>
          </ul>
        </aside>

        {/* ====== MAIN CONTENT ====== */}
      <main className="flex-1 bg-gray-50 p-6 overflow-auto">
  <div className="max-w-3xl mx-auto bg-white   p-8">
    {/* Title */}
    <h2 className="text-2xl font-bold mb-6 text-gray-800">
      Prescription Details
    </h2>

    {/* Condition */}
    {prescription?.condition && (
      <div className="mb-4">
        <h3 className="font-semibold text-gray-700">Condition</h3>
        <p className="text-gray-800">{prescription.condition}</p>
      </div>
    )}

    {/* Medicines */}
    {prescription?.drug?.length > 0 && (
      <div className="mb-4">
        <h3 className="font-semibold text-gray-700">Medicines</h3>
        <ul className="list-disc pl-5 space-y-1 text-gray-800">
          {prescription.drug.map((med, i) => (
            <li key={i}>
              {med.name} — {med.dose}, {med.freq} for {med.days} days
            </li>
          ))}
        </ul>
      </div>
    )}

    {/* Next Visit */}
    {prescription?.nextVisit && (
      <div className="mb-4">
        <h3 className="font-semibold text-gray-700">Next Visit</h3>
        <p className="text-gray-800">{prescription.nextVisit}</p>
      </div>
    )}

    {/* Notes */}
    {prescription?.messages && (
      <div>
        <h3 className="font-semibold text-gray-700">Notes</h3>
        <p className="text-gray-800">{prescription.messages}</p>
      </div>
    )}
  </div>
</main>

      </div>

      {/* ====== FOOTER ====== */}
      <Footer/>
    </div>
    </div>
  );
};

export default PrescriptionPage;
