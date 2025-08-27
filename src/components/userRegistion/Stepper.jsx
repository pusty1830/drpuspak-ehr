import { useLocation } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { getUserRole } from "../../services/axiosClient";

const allSteps = [
  "User Type",
  "Patient Info",
  "Doctors",
  "Agreement",
  "Payment",
  "Success",
];

const allowedRoles = ["Receptionist", "Admin", "Doctor"];

const Stepper = () => {
  const location = useLocation();
  const role = getUserRole();

  // Remove "Payment" if Receptionist
  const steps = allowedRoles.includes(role)
    ? allSteps.filter((step) => step !== "Payment")
    : allSteps;

  // Map pathIndex dynamically based on steps
  const dynamicPathIndex = {};
  steps.forEach((step, idx) => {
    if (step === "User Type") dynamicPathIndex["/"] = idx;
    if (step === "Patient Info") dynamicPathIndex["/form"] = idx;
    if (step === "Doctors") dynamicPathIndex["/doctors"] = idx;
    if (step === "Agreement") dynamicPathIndex["/agreement"] = idx;
    if (step === "Payment") dynamicPathIndex["/payment"] = idx;
    if (step === "Success") dynamicPathIndex["/success"] = idx;
  });

  const activeStep = dynamicPathIndex[location.pathname] ?? 0;

  return (
    <div className="w-full max-w-5xl mx-auto px-2 mb-8">
      <div className="relative flex items-center justify-between">
        {/* Progress line */}
        <div className="absolute top-4 left-0 w-full h-1 bg-gray-300 z-0 rounded-full" />
        <div
          className="absolute top-4 left-0 h-1 bg-blue-600 z-10 rounded-full transition-all duration-500"
          style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((label, index) => {
          const isActive = index === activeStep;
          const isComplete = index < activeStep;

          return (
            <div
              key={label}
              className="relative z-20 flex flex-col items-center text-center flex-1"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300
                  ${
                    isActive
                      ? "bg-blue-600 border-blue-600 text-white shadow-md"
                      : isComplete
                      ? "bg-green-500 border-green-500 text-white"
                      : "bg-white border-gray-300 text-gray-400"
                  }`}
              >
                {isComplete ? <FaCheck size={14} /> : index + 1}
              </div>
              <p
                className={`mt-2 text-xs sm:text-sm ${
                  isActive
                    ? "text-blue-700 font-semibold"
                    : isComplete
                    ? "text-green-600"
                    : "text-gray-500"
                }`}
              >
                {label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;
