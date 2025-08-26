import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMicrophone } from "react-icons/fa6";
import { useRegistration } from "../../context/RegistrationContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const phoneRegExp = /^(\+91|0)?[6789]\d{9}$/;

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  name: Yup.string().required("Full Name is required"),
  parentName: Yup.string().required("Parent Name is required"),
  gender: Yup.string().required("Gender is required"),
  dob: Yup.date()
    .max(new Date(), "Date of birth cannot be in the future")
    .required("Date of Birth is required"),
  phone: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Phone number is required"),
  email: Yup.string().email("Invalid email address").optional(),
  bloodGroup: Yup.string().optional(),
  address: Yup.string().required("Address is required"),
  bookingDate: Yup.date()
    .min(
      new Date(new Date().setHours(0, 0, 0, 0)),
      "Booking date cannot be in the past"
    ) // ✅
    .required("Booking date is required"),
});

const Step2_Form = () => {
  const navigate = useNavigate();
  const { formData, updateFormData } = useRegistration();
  const [recordingField, setRecordingField] = useState(null);

  // Calculate age helper
  const calculateAge = (dob) => {
    if (!dob) return "";
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age >= 0 ? age.toString() : "";
  };

  // Web Speech API voice input for a Formik field
  const startRecording = (field, setFieldValue) => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Your browser does not support voice input.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setRecordingField(field);

    recognition.onresult = (event) => {
      const transcript = event.results[0].transcript;
      setFieldValue(field, transcript);
    };

    recognition.onend = () => setRecordingField(null);
    recognition.onerror = (event) => {
      alert("Speech recognition error: " + event.error);
      setRecordingField(null);
    };

    recognition.start();
  };

  const initialValues = formData.step2 || {
    title: "",
    name: "",
    parentName: "",
    gender: "",
    dob: "",
    age: "",
    bloodGroup: "",
    address: "",
    phone: "",
    email: "",
    bookingDate: "",
  };

  return (
    <div className="bg-white w-full max-w-full p-6 md:p-10 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-blue-700 text-center mb-6">
        Patient Registration
      </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          updateFormData("step2", values);
          navigate("/doctors");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="col-span-full">
              <label className="font-semibold text-gray-700 mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {["Mr", "Mrs", "Ms", "Other"].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setFieldValue("title", option)}
                    className={`py-2 px-4 rounded-full font-medium border transition-all ${
                      values.title === option
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 border-gray-400 hover:bg-blue-50"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
           

            {/* Full Name with voice */}
            <div className="flex flex-col relative">
              <label className="font-semibold text-gray-700">
                Full Name <span className="text-red-500">*</span>
              </label>
              <Field
                name="name"
                type="text"
                className="mt-1 p-2 border rounded shadow-sm outline-none border-gray-400"
              />
              <button
                type="button"
                onClick={() => startRecording("name", setFieldValue)}
                className={`absolute right-2 bottom-2 w-7 h-7 rounded-full ${
                  recordingField === "name" ? "bg-red-500" : "bg-blue-500"
                } flex items-center justify-center text-white`}
                title="Voice input"
              >
                <FaMicrophone size={12} />
              </button>
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Parent Name with voice */}
            <div className="flex flex-col relative">
              <label className="font-semibold text-gray-700">
                Parent Name <span className="text-red-500">*</span>
              </label>
              <Field
                name="parentName"
                type="text"
                className="mt-1 p-2 border rounded shadow-sm outline-none border-gray-400"
              />
              <button
                type="button"
                onClick={() => startRecording("parentName", setFieldValue)}
                className={`absolute right-2 bottom-2 w-7 h-7 rounded-full ${
                  recordingField === "parentName" ? "bg-red-500" : "bg-blue-500"
                } flex items-center justify-center text-white`}
                title="Voice input"
              >
                <FaMicrophone size={12} />
              </button>
              <ErrorMessage
                name="parentName"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
             {/* Booking Date */}
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700">
                Booking Date <span className="text-red-500">*</span>
              </label>
              <Field
                name="bookingDate"
                type="date"
                min={new Date().toISOString().split("T")[0]} // ✅ disable past dates
                className="mt-1 p-2 border rounded shadow-sm border-gray-400 outline-none"
              />
              <ErrorMessage
                name="bookingDate"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Gender */}
            <div className="col-span-full">
              <label className="font-semibold text-gray-700 mb-2">
                Gender <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {["Male", "Female", "Other"].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setFieldValue("gender", option)}
                    className={`py-2 px-4 rounded-full font-medium border transition-all ${
                      values.gender === option
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 border-gray-400 hover:bg-blue-50"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <ErrorMessage
                name="gender"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Date of Birth */}
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700">
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <Field
                name="dob"
                type="date"
                className="mt-1 p-2 border rounded shadow-sm border-gray-400 outline-none"
                onChange={(e) => {
                  const dob = e.target.value;
                  setFieldValue("dob", dob);
                  setFieldValue("age", calculateAge(dob));
                }}
              />
              <ErrorMessage
                name="dob"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Age read-only */}
            <div className="flex flex-col relative">
              <label className="font-semibold text-gray-700">Age</label>
              <Field
                name="age"
                type="number"
                readOnly
                className="mt-1 p-2 border rounded shadow-sm border-gray-400 outline-none bg-gray-100 cursor-not-allowed"
              />
            </div>

            {/* Blood Group */}
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700">Blood Group</label>
              <Field
                as="select"
                name="bloodGroup"
                className="mt-1 p-2 border border-gray-400 outline-none rounded shadow-sm w-full"
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
              </Field>
            </div>

            {/* Address */}
            <div className="flex flex-col relative">
              <label className="font-semibold text-gray-700">Address</label>
              <Field
                name="address"
                type="text"
                className="mt-1 p-2 border rounded shadow-sm outline-none border-gray-400"
              />
            </div>

            {/* Phone Number */}
            <div className="flex flex-col relative">
              <label className="font-semibold text-gray-700">
                Phone Number
              </label>
              <Field
                name="phone"
                type="tel"
                className="mt-1 p-2 border rounded shadow-sm outline-none border-gray-400"
              />
              <button
                type="button"
                onClick={() => startRecording("phone", setFieldValue)}
                className={`absolute right-2 bottom-2 w-7 h-7 rounded-full ${
                  recordingField === "phone" ? "bg-red-500" : "bg-blue-500"
                } flex items-center justify-center text-white`}
                title="Voice input"
              >
                <FaMicrophone size={12} />
              </button>
              <ErrorMessage
                name="phone"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col relative">
              <label className="font-semibold text-gray-700">Email</label>
              <Field
                name="email"
                type="email"
                className="mt-1 p-2 border rounded shadow-sm outline-none border-gray-400"
              />
              <button
                type="button"
                onClick={() => startRecording("email", setFieldValue)}
                className={`absolute right-2 bottom-2 w-7 h-7 rounded-full ${
                  recordingField === "email" ? "bg-red-500" : "bg-blue-500"
                } flex items-center justify-center text-white`}
                title="Voice input"
              >
                <FaMicrophone size={12} />
              </button>
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Navigation Buttons */}
            <div className="col-span-full flex justify-between mt-6">
              <button
                type="button"
                onClick={() => navigate("/usertype")}
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
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Step2_Form;
