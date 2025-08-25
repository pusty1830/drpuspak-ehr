import React from "react";

const PrescriptionHeader = () => {
  return (
    <div className="w-full border-b-2 border-black ">
      {/* Top section */}
      <div className="flex justify-between items-start bg-gradient-to-r from-sky-200 to-sky-300 p-4">
        {/* Left side (Doctor details) */}
        <div className="text-left text-black leading-tight">
          <h1 className="text-lg font-bold uppercase">Prof. Dr. Puspak Samal</h1>
          <p className="text-sm font-semibold">MS (Orthopaedics)</p>
          <p className="text-sm font-bold">Consultant Orthopaedics & Spine</p>
          <p className="text-xs">(SUM Ultimate Medicare)</p>
          <p className="text-xs">Senior Resident P.G.I Chandigarh</p>
          <p className="text-xs">Fellowship Spine Surgery, Ahmedabad</p>
          <p className="text-xs">Fellowship Orthopaedics Trauma, Seoul, Korea</p>
          <p className="text-xs font-semibold">Regd. No. 16274</p>
        </div>

        {/* Right side (Logo + Address) */}
        <div className="text-right">
          <div className="flex justify-end">
            {/* Replace with actual logo */}
            <div className="w-16 h-16  border flex items-center justify-center ">
              <span className="text-green-600 font-bold text-lg">Logo</span>
            </div>
          </div>
          <p className="text-sm font-semibold mt-1">ORTHOSPINECARE</p>
          <p className="text-xs">B13, HIG DUPLEX, BARAMUNDA</p>
        </div>
      </div>

      {/* Patient details line */}
         <div className="text-sm px-4 py-2 pb-3">
              <div className="flex flex-wrap justify-between">
                <p>
                  Name: ________________________________ &nbsp; Age/Sex: ________ &nbsp; Phone: __________
                </p>
              </div>
              <div className="flex flex-wrap justify-between mt-1">
                <p>
                  Address: __________________ &nbsp; BP: _+_____ &nbsp; Pulse: ___ &nbsp; Wt: _____ &nbsp; Ht: ___ &nbsp; Temp: ___
                </p>
              </div>
            </div>
          
    </div>
  );
};

export default PrescriptionHeader;