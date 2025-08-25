import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegistration } from "../../context/RegistrationContext";
import { createOrder } from "../../services/services";
import RenderRazorpay from "../../components/RanderRazorpay";

const Step5_Payment = () => {
  const navigate = useNavigate();
  const { formData, updateFormData } = useRegistration();
  const [loading, setLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null); // store order

  const generateBookingId = () => {
    const rand = Math.floor(1000 + Math.random() * 9000); // 4-digit random
    return `DOC${Date.now()}${rand}`;
  };

  const handlePayment = async () => {
    try {
      setLoading(true);

      // 1️⃣ Create order from backend
      const payLoad = {
        amount: 100, // paise
        currency: "INR",
        receipt: generateBookingId(),
      };

      const res = await createOrder(payLoad);

      // ✅ Save bookingId & open Razorpay component
      updateFormData("step5", { bookingId: payLoad.receipt });
      setOrderDetails(res?.data?.data); // pass to RenderRazorpay
    } catch (err) {
      console.error("Payment error:", err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] bg-gray-50 flex justify-center items-center ">
      <div className="bg-white rounded-xl shadow-lg max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* LEFT: Appointment Info */}
        <div className="p-6 md:p-8 bg-gradient-to-br from-blue-50 via-white to-white">
          <h2 className="text-xl font-bold text-blue-800 mb-4 border-b pb-2">
            Appointment Summary
          </h2>

          <div className="space-y-3 text-sm text-gray-700">
            <p>
              <strong>Doctor:</strong> {formData?.name || "Dr. Pushpak"}
            </p>
            <p>
              <strong>Department:</strong> {"General Medicine"}
            </p>
            <p>
              <strong>Consultation Timing:</strong> {"10:00 AM – 2:00 PM"}
            </p>
            <p>
              <strong>Booking ID:</strong>
              <span className="text-blue-600 font-semibold">
                {" "}
                #{generateBookingId()}{" "}
              </span>
            </p>
            <p>
              <strong>Patient Name:</strong> {formData?.step2?.name || "N/A"}
            </p>
          </div>

          <div className="mt-6 border-t pt-4 text-xs text-gray-500">
            By proceeding, you confirm that the above details are correct and
            agree to our consultation policy.
          </div>

          <button
            onClick={() => navigate("/register/agreement")}
            className="mt-6 inline-block text-sm text-blue-600 hover:underline"
          >
            ← Back to Agreement
          </button>
        </div>

        {/* RIGHT: Payment */}
        <div className="p-6 md:p-8 bg-white flex flex-col items-center justify-center text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Pay ₹100 Token
          </h2>

          <p className="text-sm text-gray-500 mb-2">
            Confirm your appointment by paying a one-time consultation token.
          </p>

          <button
            onClick={handlePayment}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow disabled:opacity-50"
          >
            {loading ? "Processing..." : "✅ Confirm & Pay"}
          </button>
        </div>
      </div>

      {/* Razorpay Component */}
      {orderDetails && (
        <RenderRazorpay orderDetails={orderDetails} bookingDetails={formData} />
      )}
    </div>
  );
};

export default Step5_Payment;
