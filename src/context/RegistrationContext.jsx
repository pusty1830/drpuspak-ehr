import { createContext, useContext, useState } from "react";

const RegistrationContext = createContext();

export const RegistrationProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    step1: {},
    step2: {},
    step3: {},
    step4: {},
    step5: {},
    step6: {},
  });

  const updateFormData = (stepKey, data) => {
    setFormData((prev) => ({
      ...prev,
      [stepKey]: { ...prev[stepKey], ...data }, // merge step data
    }));
  };

  return (
    <RegistrationContext.Provider value={{ formData, updateFormData }}>
      {children}
    </RegistrationContext.Provider>
  );
};

export const useRegistration = () => useContext(RegistrationContext);
