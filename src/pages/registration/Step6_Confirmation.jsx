import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const Step6_Success = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[90vh] bg-gray-50 flex justify-center items-center px-4">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-lg p-8 md:p-12">
        {/* ✅ Success Icon and Message */}
        <div className="flex flex-col items-center text-center mb-8">
          <FaCheckCircle size={60} className="text-green-600 mb-4" />
          <h2 className="text-3xl font-bold text-gray-800">
            Appointment Confirmed
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Your booking with Dr. Pushpak has been successfully completed.
          </p>
        </div>

        {/* 🧾 Summary Card */}
        <div className="border rounded-lg p-6 bg-white shadow-sm space-y-4 text-sm text-gray-700">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500">Patient Name</p>
              <p className="font-medium text-gray-900">Jagat Jyoti</p>
            </div>
            <div>
              <p className="text-gray-500">Booking ID</p>
              <p className="font-medium text-gray-900">#DOC2025080401</p>
            </div>
            <div>
              <p className="text-gray-500">Doctor</p>
              <p className="font-medium text-gray-900">Dr. Pushpak</p>
            </div>
            <div>
              <p className="text-gray-500">Department</p>
              <p className="font-medium text-gray-900">General Medicine</p>
            </div>
            <div>
              <p className="text-gray-500">Date</p>
              <p className="font-medium text-gray-900">05 Aug 2025</p>
            </div>
            <div>
              <p className="text-gray-500">Time Slot</p>
              <p className="font-medium text-gray-900">10:00 AM – 2:00 PM</p>
            </div>
            <div>
              <p className="text-gray-500">Status</p>
              <p className="font-semibold text-green-600">Confirmed</p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md shadow"
          >
            Go to Home →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step6_Success;
