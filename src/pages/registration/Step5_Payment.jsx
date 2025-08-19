import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useRegistration } from "../../context/RegistrationContext"; 

const Step5_Payment = () => {
  const navigate = useNavigate();
  const { formData, updateFormData } = useRegistration();

  const generateBookingId = () => {
    const rand = Math.floor(1000 + Math.random() * 9000); // 4-digit random
    return `DOC${Date.now()}${rand}`;
  };

  const handlePayment = () => {
    const bookingId = generateBookingId();

    // create payload
    const payload = {
      bookingId,
      doctor: formData?.step3?.doctor || {},
      patientName: formData?.step2?.name || "N/A",
      amount: 100,
      status: "Success", // you can set "Pending" if you want before confirmation
      date: new Date().toISOString(),
    };

    // Save to context
    updateFormData("step5", payload);

    alert(`✅ Payment Successful! Booking ID: ${bookingId}`);
    navigate("/register/success");
  }

  return (
    <div className="min-h-[80vh] bg-gray-50 flex justify-center items-center ">
      <div className="bg-white rounded-xl shadow-lg max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        
        {/* LEFT: Appointment Info */}
        <div className="p-6 md:p-8 bg-gradient-to-br from-blue-50 via-white to-white">
          <h2 className="text-xl font-bold text-blue-800 mb-4 border-b pb-2">
            Appointment Summary
          </h2>

          <div className="space-y-3 text-sm text-gray-700">
            <p><strong>Doctor:</strong> {formData?.name || "Dr. Pushpak"}</p>
            <p><strong>Department:</strong> { "General Medicine"}</p>
            <p><strong>Consultation Timing:</strong> { "10:00 AM – 2:00 PM"}</p>
            <p>
              <strong>Booking ID:</strong> 
              <span className="text-blue-600 font-semibold"> #DOC2025080401 </span>
            </p>
            <p><strong>Patient Name:</strong> {formData?.step2.name || "N/A"}</p>
          </div>

          <div className="mt-6 border-t pt-4 text-xs text-gray-500">
            By proceeding, you confirm that the above details are correct and agree to our consultation policy.
          </div>

          <button
            onClick={() => navigate("/register/agreement")}
            className="mt-6 inline-block text-sm text-blue-600 hover:underline"
          >
            ← Back to Agreement
          </button>
        </div>

        {/* RIGHT: Payment + QR Code */}
        <div className="p-6 md:p-8 bg-white flex flex-col items-center justify-center text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Pay ₹100 Token</h2>
          
          <p className="text-sm text-gray-500 mb-2">
            Confirm your appointment by paying a one-time consultation token.
          </p>

          {/* QR Code */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-inner w-fit mx-auto mb-4">
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?data=upi://pay?pa=pushpak@upi&pn=DrPushpak&am=100&cu=INR&size=200x200"
              alt="QR Code for Payment"
              className="w-44 h-44 rounded"
            />
          </div>
          <p className="text-xs text-gray-500 mb-6">
            Scan using any UPI app (Google Pay, Paytm, PhonePe, etc.)
          </p>

          <button
            onClick={handlePayment}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow"
          >
            ✅ Confirm Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step5_Payment;
