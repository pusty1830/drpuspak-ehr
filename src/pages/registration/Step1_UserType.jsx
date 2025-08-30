import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRegistration } from "../../context/RegistrationContext";

const Step1_UserType = () => {
 const [selected, setSelected] = useState(null);
  const navigate = useNavigate();
  const { updateFormData } = useRegistration();

  const handleSelect = (type) => {
    setSelected(type);

    // ✅ Save into step1 only
    updateFormData("step1", { userType: type });
    console.log({ userType: type })
  };

  const handleNext = () => {
    if (selected === "new") {
      navigate("form"); // go to next step
    } else if (selected === "existing") {
      navigate("/existing-user");
    } else {
      alert("Please select an option.");
    }
  };

  return (
    <div className="w-full max-w-5xl p-4 md:p-8 rounded-xl shadow-sm">
      <h2 className="text-xl md:text-2xl font-bold text-blue-700 md:mb-6 mb-2 text-center">
        Are you a new or existing patient?
      </h2>

     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
  {/* New Patient */}
  <div
    onClick={() => handleSelect("new")}
    className={`cursor-pointer border-2 rounded-lg p-6 text-center transition
      ${
        selected === "new"
          ? "border-blue-600 bg-blue-50 text-blue-700"
          : "border-gray-400 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-700"
      }`}
  >
    <h3
      className={`text-xl font-semibold mb-2 transition
        ${selected === "new" ? "text-blue-700" : "text-gray-700 group-hover:text-blue-700"}`}
    >
      🆕 New Patient
    </h3>
    <p className="text-gray-600">Register as a new patient and book your consultation.</p>
  </div>

  {/* Existing Patient */}
  <div
    onClick={() => handleSelect("existing")}
    className={`cursor-pointer border-2 rounded-lg p-6 text-center transition
      ${
        selected === "existing"
          ? "border-blue-600 bg-blue-50 text-blue-700"
          : "border-gray-400 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-700"
      }`}
  >
    <h3
      className={`text-xl font-semibold mb-2 transition
        ${selected === "existing" ? "text-blue-700" : "text-gray-700 group-hover:text-blue-700"}`}
    >
      👤 Existing Patient
    </h3>
    <p className="text-gray-600">Already registered? Continue with your profile.</p>
  </div>
</div>


      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          onClick={() => navigate("/")}
          className="bg-gray-300 text-gray-700 py-2 px-6 rounded hover:bg-gray-400 font-semibold"
        >
          ← Back
        </button>

        <button
          onClick={handleNext}
          disabled={!selected}
          className={`py-2 px-6 rounded font-semibold ${
            selected
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

export default Step1_UserType;
