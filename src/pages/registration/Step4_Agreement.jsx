import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useRegistration } from "../../context/RegistrationContext"; 

const Step4_Agreement = () => {
  const navigate = useNavigate();
  const {  updateFormData } =  useRegistration();// ✅ use context
  const [agreed, setAgreed] = useState(null);
  //console.log("form data at agrement",formData)

  const handleNext = () => {
    if (!agreed) {
      alert("Please agree to the terms to continue.");
      return;
    }

    // ✅ save agreement in global context
    updateFormData("step4",{ agreed: true });

    navigate("/register/payment");
  };

  return (
    <div className="bg-white w-full max-w-2xl p-6 md:p-10 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-blue-700 text-center mb-6">
        Agreement and Consent
      </h2>

      <div className="text-gray-700 space-y-4 mb-6 text-sm">
        <p>By proceeding, you agree to the following:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>
            Your information will be stored securely and used only for medical
            consultation.
          </li>
          <li>The consultation fee of ₹100 is non-refundable.</li>
          <li>Dr. Pushpak will contact you based on the schedule you select.</li>
          <li>In case of emergency, please reach out to your nearest hospital.</li>
        </ul>
      </div>

      <div className="flex items-center mb-6">
        <input
          type="checkbox"
          id="agree"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mr-2"
        />
        <label htmlFor="agree" className="text-sm font-medium text-gray-800">
          I have read and agree to the above terms.
        </label>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => navigate("/register/doctors")}
          className="bg-gray-300 text-gray-700 py-2 px-6 rounded hover:bg-gray-400 font-semibold"
        >
          ← Back
        </button>
        <button
          onClick={handleNext}
          disabled={!agreed}
          className={`py-2 px-6 rounded font-semibold ${
            agreed
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-blue-200 text-white cursor-not-allowed"
          }`}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default Step4_Agreement;
