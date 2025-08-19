import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaMicrophone } from "react-icons/fa6";
import { useRegistration } from "../../context/RegistrationContext"; // ✅ use context

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const Step2_Form = () => {
  const navigate = useNavigate();
  const recognition = useRef(null);

  const { formData, updateFormData } = useRegistration(); // ✅ from context

  // initialize local state from context
  const [form, setForm] = useState(formData.step2 || {});

  const [recordingField, setRecordingField] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "dob") {
      const birthDate = new Date(value);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      setForm((prev) => ({
        ...prev,
        dob: value,
        age: age >= 0 ? age.toString() : "",
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const startVoiceInput = (field) => {
    if (!SpeechRecognition) {
      alert("Your browser does not support voice input.");
      return;
    }

    recognition.current = new SpeechRecognition();
    recognition.current.lang = "en-IN";
    recognition.current.interimResults = false;
    recognition.current.maxAlternatives = 1;

    recognition.current.onstart = () => setRecordingField(field);

    recognition.current.onresult = (event) => {
      const voiceInput = event.results[0][0].transcript;
      setForm((prev) => ({ ...prev, [field]: voiceInput }));
    };

    recognition.current.onend = () => setRecordingField(null);

    recognition.current.start();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ save Step2 data in global context
    updateFormData("step2", form);

    console.log("Form submitted:", form);

    navigate("/register/doctors"); // go to next step
  };

  const renderField = (
    label,
    name,
    type = "text",
    voice = true,
    required = true
  ) => (
    <div className="flex flex-col relative">
      <label className="font-semibold text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={form[name] || ""}
        onChange={handleChange}
        className="mt-1 p-2 border rounded shadow-sm"
        required={required}
        readOnly={name === "age"} // Age is read-only
      />
      {voice && name !== "age" && (
        <button
          type="button"
          onClick={() => startVoiceInput(name)}
          className={`absolute right-2 bottom-2 w-7 h-7 rounded-full ${
            recordingField === name ? "bg-red-500" : "bg-blue-500"
          } flex items-center justify-center text-white`}
          title="Voice input"
        >
          <FaMicrophone size={12} />
        </button>
      )}
    </div>
  );

  const renderSelectGroup = (label, field, options, required = true) => (
    <div className="flex flex-col">
      <label className="font-semibold text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setForm((prev) => ({ ...prev, [field]: option }))}
            className={`py-2 px-4 rounded-full font-medium border transition-all ${
              form[field] === option
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-400 hover:bg-blue-50"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-white w-full max-w-4xl p-6 md:p-10 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-blue-700 text-center mb-6">
        Patient Registration
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Title Selection */}
        <div className="col-span-full">
          {renderSelectGroup("Title", "title", ["Mr", "Mrs", "Ms", "Other"])}
        </div>

        {/* Name Fields */}
        {renderField("Full Name", "name")}
        {renderField("Parent Name", "parentName")}

        {/* Gender Selection */}
        <div className="col-span-full">
          {renderSelectGroup("Gender", "gender", ["Male", "Female", "Other"])}
        </div>

        {/* DOB Manual */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">
            Date of Birth <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="dob"
            value={form.dob || ""}
            onChange={handleChange}
            className="mt-1 p-2 border rounded shadow-sm"
            required
          />
        </div>

        {/* Auto-filled Age */}
        {renderField("Age", "age", "number", false)}

        {/* Blood Group Dropdown */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">Blood Group</label>
          <div className="relative">
            <select
              name="bloodGroup"
              value={form.bloodGroup || ""}
              onChange={handleChange}
              className="mt-1 p-2 border rounded shadow-sm w-full"
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>
        </div>

        {renderField("Address", "address")}

        {/* Optional Fields */}
        {renderField("Phone Number", "phone", "tel", true, false)}
        {renderField("Email", "email", "email", true, false)}

        {/* Navigation Buttons */}
        <div className="col-span-full flex justify-between mt-6">
          <button
            type="button"
            onClick={() => navigate("/register/usertype")}
            className="bg-gray-300 text-gray-700 py-2 px-6 rounded hover:bg-gray-400 font-semibold"
          >
            ← Back
          </button>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 font-semibold"
          >
            Next →
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step2_Form;
