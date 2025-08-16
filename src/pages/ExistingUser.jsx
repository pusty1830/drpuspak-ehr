import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ExistingUser = () => {
  const [mobile, setMobile] = useState("");
  const [historyVisible, setHistoryVisible] = useState(false);
  const navigate = useNavigate();

  // Voice Input
  const handleVoiceInput = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Your browser does not support voice input.");
      return;
    }
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-IN";
    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript.replace(/\s/g, "");
      setMobile(spokenText);
    };
    recognition.start();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mobile.length < 10) {
      alert("Please enter a valid mobile number");
      return;
    }
    setHistoryVisible(true);
  };

  const handleProceed = () => {
    navigate("/register/doctors"); // Change to your Doctor selection route
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-lg w-full">
        {!historyVisible ? (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
              Existing User Login
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Registered Mobile Number
                </label>
                <div className="flex gap-2">
                  <input
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="Enter your mobile number"
                    className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring focus:ring-blue-300"
                  />
                  <button
                    type="button"
                    onClick={handleVoiceInput}
                    className="bg-blue-500 text-white px-4 rounded-lg hover:bg-blue-600"
                  >
                    🎤
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-700 font-medium"
              >
                Next
              </button>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
              Your Visit History
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <p className="text-gray-700">
                  <strong>Last Appointment:</strong> 28 July 2025
                </p>
                <p className="text-gray-700">
                  <strong>Doctor:</strong> Dr. Pushpak
                </p>
                <p className="text-gray-700">
                  <strong>Reason:</strong> General Checkup
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <p className="text-gray-700">
                  <strong>Previous Appointment:</strong> 10 March 2025
                </p>
                <p className="text-gray-700">
                  <strong>Doctor:</strong> Dr. Pushpak
                </p>
                <p className="text-gray-700">
                  <strong>Reason:</strong> Fever & Weakness
                </p>
              </div>
            </div>
            <button
              onClick={handleProceed}
              className="mt-6 w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 font-medium"
            >
              Proceed to Doctor Page
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ExistingUser;
