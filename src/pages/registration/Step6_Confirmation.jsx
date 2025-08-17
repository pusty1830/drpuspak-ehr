import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaCalendarAlt, FaUserMd, FaUser, FaFileAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";
import { useRegistration } from "../../context/RegistrationContext"; 

const Step6_Success = () => {
  const navigate = useNavigate();
  const [width, height] = useWindowSize();
  const [showConfetti, setShowConfetti] = React.useState(true);

  const { formData } = useRegistration()

  console.log("form data", formData)

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };
  useEffect(() => {
  if (formData?.step5?.bookingId) {
    // Combine data into one object
    const finalBookingData = {
      bookingId: formData.step5.bookingId,
      patientName: formData.step2?.name,
      age: formData.step2?.age,
      gender: formData.step2?.gender,
      dob: formData.step2?.dob,
      address: formData.step2?.address,
      parentName: formData.step2?.parentName,
      title: formData.step2?.title,
      doctor: formData.step3?.docter, // careful: it's "docter" in your state
      amount: formData.step5?.amount,
      status: formData.step5?.status,
      date: formData.step5?.date,
    };

    // Save in localStorage
    localStorage.setItem("appointmentData", JSON.stringify(finalBookingData));
  }
}, [formData]);


  return (
    <div className="min-h-[90vh] bg-gradient-to-br from-blue-50 to-green-50 flex justify-center items-center px-4 py-8">
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={300}
        />
      )}
      
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="bg-white w-full max-w-3xl rounded-xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-green-500 p-6 text-white relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white bg-opacity-10 rounded-full"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-white bg-opacity-10 rounded-full"></div>
          
          <motion.div variants={itemVariants} className="relative z-10 flex flex-col items-center text-center">
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.5, repeat: 1, repeatDelay: 1 }}
            >
              <FaCheckCircle size={70} className="text-white mb-4 drop-shadow-lg" />
            </motion.div>
            <h2 className="text-2xl font-bold mb-2">Appointment Confirmed!</h2>
            <p className="text-blue-100 max-w-md">
              Your booking with {"Doctor"} has been successfully completed. We've sent the details to your email.
            </p>
          </motion.div>
        </div>

        {/* Summary Card */}
        <motion.div variants={itemVariants} className="p-6 md:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Patient Info */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-blue-50 rounded-lg p-5 border border-blue-100"
            >
              <div className="flex items-center mb-3">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <FaUser className="text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-800">Patient Information</h3>
              </div>
              <div className="space-y-2 pl-11">
                <p className="text-sm">
                  <span className="text-gray-500">Name:</span>{" "}
                  <span className="font-medium text-gray-800">{formData?.name || "N/A"}</span>
                </p>
                <p className="text-sm">
                  <span className="text-gray-500">Booking ID:</span>{" "}
                  <span className="font-medium text-gray-800">{ "#DOC2025080401"}</span>
                </p>
              </div>
            </motion.div>

            {/* Doctor Info */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-green-50 rounded-lg p-5 border border-green-100"
            >
              <div className="flex items-center mb-3">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <FaUserMd className="text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-800">Doctor Information</h3>
              </div>
              <div className="space-y-2 pl-11">
                <p className="text-sm">
                  <span className="text-gray-500">Doctor:</span>{" "}
                  <span className="font-medium text-gray-800">{ "N/A"}</span>
                </p>
                <p className="text-sm">
                  <span className="text-gray-500">Department:</span>{" "}
                  <span className="font-medium text-gray-800">{"N/A"}</span>
                </p>
              </div>
            </motion.div>

            {/* Appointment Details */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-purple-50 rounded-lg p-5 border border-purple-100"
            >
              <div className="flex items-center mb-3">
                <div className="bg-purple-100 p-2 rounded-full mr-3">
                  <FaCalendarAlt className="text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-800">Appointment Details</h3>
              </div>
              <div className="space-y-2 pl-11">
                <p className="text-sm">
                  <span className="text-gray-500">Date:</span>{" "}
                  <span className="font-medium text-gray-800">{"05 Aug 2025"}</span>
                </p>
                <p className="text-sm">
                  <span className="text-gray-500">Time Slot:</span>{" "}
                  <span className="font-medium text-gray-800">{ "10:00 AM – 2:00 PM"}</span>
                </p>
              </div>
            </motion.div>

            {/* Status */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-yellow-50 rounded-lg p-5 border border-yellow-100"
            >
              <div className="flex items-center mb-3">
                <div className="bg-yellow-100 p-2 rounded-full mr-3">
                  <FaFileAlt className="text-yellow-600" />
                </div>
                <h3 className="font-semibold text-gray-800">Status & Next Steps</h3>
              </div>
              <div className="space-y-2 pl-11">
                <p className="text-sm">
                  <span className="text-gray-500">Status:</span>{" "}
                  <span className="font-semibold text-green-600">Conform</span>
                </p>
                <p className="text-sm text-gray-600">
                  You'll receive a reminder 24 hours before your appointment.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Extra Info */}
          <motion.div 
            variants={itemVariants}
            className="bg-gray-50 rounded-lg p-4 border border-gray-200 text-center"
          >
            <p className="text-sm text-gray-600">
              Need to reschedule? Contact our support at <span className="font-medium text-blue-600">support@medicare.com</span> or call <span className="font-medium">+1 (555) 123-4567</span>
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-center gap-4 pt-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/")}
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all"
            >
              Go to Home
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/appointments")}
              className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-lg shadow-sm transition-all"
            >
              View My Appointments
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.div 
          variants={itemVariants}
          className="bg-gray-50 p-4 text-center border-t border-gray-200"
        >
          <p className="text-xs text-gray-500">
            Thank you for choosing our service. We look forward to serving you!
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Step6_Success;
