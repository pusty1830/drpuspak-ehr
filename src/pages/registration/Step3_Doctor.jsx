import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRegistration } from "../../context/RegistrationContext";
import {
  getAllDoctor,
  getDoctorDetailswithuserId,
} from "../../services/services";

const Step3_Doctor = () => {
  const navigate = useNavigate();
  const { updateFormData } = useRegistration();
  const location = useLocation();
  const userId = location.state?.userId;
  const userName = location.state?.userName;
  const bookingDate = location.state?.bookingDate; // ✅ same name

  const [doctorInfo, setDoctorInfo] = useState({
    name: "",
    department: "",
    timing: "",
    image: "",
  });

  useEffect(() => {
    const Payload = {
      data: { filter: "", role: "Doctor" },
      page: 0,
      pageSize: 50,
      order: [["createdAt", "ASC"]],
    };

    getAllDoctor(Payload)
      .then((res) => {
        const firstDoctor = res?.data?.data?.rows?.[0];

        if (firstDoctor) {
          // Set doctor name from first API
          const doctorName = firstDoctor.userName || "";

          // Then fetch details from second API with userId
          getDoctorDetailswithuserId(firstDoctor.id).then((detailRes) => {
            const details = detailRes?.data?.data || {};
            console.log(details);

            setDoctorInfo({
              id: firstDoctor.id,
              name: doctorName,
              department: details.dept || "",
              timing: details.timing || "",
              image: details.doctImg || "../../assets/puspakbgremove.png", // fallback image
            });
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching doctor info:", error);
      });
  }, []);

  const handleNext = () => {
    // Save doctorInfo to global context
    if (userId) {
      updateFormData("step3", {
        doctor: doctorInfo,
        userId: userId,
        bookingDate: bookingDate,
        userName: userName,
      }); // fixed typo to "doctor"
    } else {
      updateFormData("step3", { doctor: doctorInfo }); // fixed typo to "doctor"
    }

    navigate("/agreement");
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
          <h3 className="text-xl font-semibold text-gray-800">
            {doctorInfo.name}
          </h3>
          <p className="text-gray-600 mt-1">
            Department: {doctorInfo.department}
          </p>
          <p className="text-gray-600">Timing: {doctorInfo.timing}</p>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={() => navigate("/form")}
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
