// src/pages/doctor/PrescriptionPage.jsx
import React from "react";
import Header from "./PrescriptionComp/Header";
import Footer from "./PrescriptionComp/Footer";
import Sidebar from "./PrescriptionComp/Sidebar";
import PrescriptionDetails from "./PrescriptionComp/PrescriptionDetails";

const PrescriptionPage = () => {
    const handlePrint = () => {
        const printContent = document.getElementById('prescription-container');
        const originalContents = document.body.innerHTML;
        
        document.body.innerHTML = printContent.innerHTML;
        window.print();
        document.body.innerHTML = originalContents;
        window.location.reload();
    };
   
    return (
        <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
            {/* Print Button - will not appear in print */}
            <div className="w-full max-w-3xl mb-4 print:hidden">
                <button 
                    onClick={handlePrint}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-md  fixed bottom-4 right-4 z-50"
                >
                    Print Prescription
                </button>
            </div>

            {/* Prescription Container */}
            <div id="prescription-container" className="flex flex-col w-full max-w-3xl border border-gray-300 bg-white shadow-lg md:mt-4">
                {/* ====== HEADER ====== */}
                <Header />

                <div className="flex flex-1 min-h-[650px]">
                    {/* ====== SIDEBAR ====== */}
                    <Sidebar />
                    {/* ====== MAIN CONTENT ====== */}
                    <PrescriptionDetails />
                </div>

                {/* ====== FOOTER ====== */}
                <Footer />
            </div>

            {/* Print styles */}
            <style>
                {`
                    @media print {
                        body * {
                            visibility: hidden;
                            margin: 0;
                            padding: 0;
                        }
                        #prescription-container, #prescription-container * {
                            visibility: visible;
                        }
                        #prescription-container {
                            position: absolute;
                            left: 0;
                            top: 0;
                            width: 100%;
                            height: 100%;
                            border: none;
                            box-shadow: none;
                        }
                        .no-print {
                            display: none !important;
                        }
                        @page {
                            size: A4;
                            margin: 0;
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default PrescriptionPage;