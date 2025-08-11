import { useNavigate } from "react-router-dom";
import { useState } from "react";

const languages = ["English", "Hindi", "Odia"];

const Step0_Language = () => {
  const [selectedLang, setSelectedLang] = useState("");
  const navigate = useNavigate();

  const handleContinue = () => {
    if (!selectedLang) {
      alert("Please select a language");
      return;
    }
    localStorage.setItem("preferredLang", selectedLang);
    navigate("/register/usertype");
  };

  return (
    <div className="w-full max-w-xl bg-white p-8 rounded-xl shadow-md">
      <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">
        Select Your Preferred Language
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {languages.map((lang) => (
          <button
            key={lang}
            onClick={() => setSelectedLang(lang)}
            className={`py-3 rounded-lg font-semibold border ${
              selectedLang === lang
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-gray-100 hover:bg-blue-100 border-gray-300 text-gray-700"
            }`}
          >
            {lang}
          </button>
        ))}
      </div>
      <button
        onClick={handleContinue}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition"
      >
        Continue
      </button>
    </div>
  );
};

export default Step0_Language;
