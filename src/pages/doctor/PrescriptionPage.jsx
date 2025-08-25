// src/pages/doctor/PrescriptionPage.jsx
import React from "react";
import Header from "./PrescriptionComp/Header";
import Footer from "./PrescriptionComp/Footer";
import Sidebar from "./PrescriptionComp/Sidebar";
import PrescriptionDetails from "./PrescriptionComp/PrescriptionDetails";

const PrescriptionPage = () => {
   
   
    return (
        <div className=" flex justify-center items-center m-4">

            <div className="flex flex-col  mt-10 max-w-3xl border border-gray-200 ">
                {/* ====== HEADER ====== */}
                <Header />

                <div className="flex flex-1 min-h-[650px] ">
                    {/* ====== SIDEBAR ====== */}
                    <Sidebar />
                    {/* ====== MAIN CONTENT ====== */}
                    <PrescriptionDetails />

                </div>

                {/* ====== FOOTER ====== */}
                <Footer />
            </div>
        </div>
    );
};

export default PrescriptionPage;
