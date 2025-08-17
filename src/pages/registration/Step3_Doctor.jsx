import React from "react";
import { useNavigate } from "react-router-dom";
import { useRegistration } from "../../context/RegistrationContext"; // ✅ import context


const Step3_Doctor = () => {
  const navigate = useNavigate();
  const { updateFormData } = useRegistration(); // ✅ get updater

  const doctorInfo = {
    name: "Dr. Pushpak",
    department: "General Medicine",
    timing: "10:00 AM - 2:00 PM",
    image: "https://picsum.photos/200/300",
  };

    const { formData, selectedDoctor, bookingId, appointmentDate, isPaid } = useRegistration()
    console.log(formData)
  

  const handleNext = () => {
    // ✅ Save doctor info to global context
        updateFormData("step3", { docter: doctorInfo });
        console.log({ docter: doctorInfo })

    // updateFormData((prev) => ({
    //   ...prev,
    //   doctor: doctorInfo,
    // }));
    navigate("/register/agreement");
  };

  return (
    <div className="bg-white w-full max-w-2xl p-6 md:p-10 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-blue-700 text-center mb-6">
        Assigned Doctor
      </h2>

      <div className="flex flex-col md:flex-row items-center gap-6">
        <img
          src={doctorInfo.image}
          alt={doctorInfo.name}
          className="w-40 h-40 rounded-full object-cover shadow-md"
        />

        <div className="text-center md:text-left">
          <h3 className="text-xl font-semibold text-gray-800">{doctorInfo.name}</h3>
          <p className="text-gray-600 mt-1">Department: {doctorInfo.department}</p>
          <p className="text-gray-600">Timing: {doctorInfo.timing}</p>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={() => navigate("/register/form")}
          className="bg-gray-300 text-gray-700 py-2 px-6 rounded hover:bg-gray-400 font-semibold"
        >
          ← Back
        </button>
        <button
          onClick={handleNext}
          className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 font-semibold"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default Step3_Doctor;
