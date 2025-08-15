import { Routes, Route } from "react-router-dom";
import Step0_Language from "../pages/registration/Step0_Language";
 import Step1_UserType from "../pages/registration/Step1_UserType";
 import Step2_Form from "../pages/registration/Step2_Form";
 import Step3_Doctor from "../pages/registration/Step3_Doctor";
 import Step4_Agreement from "../pages/registration/Step4_Agreement";
 import Step5_Payment from "../pages/registration/Step5_Payment";
 import Step6_Confirmation from "../pages/registration/Step6_Confirmation";
import Stepper from "../components/userRegistion/Stepper";

const RegistrationRoutes = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-4">
      <Stepper />
      <Routes>
        {/* <Route path="/" element={<Step0_Language />} /> */}
        <Route path="/" element={<Step1_UserType />} />
        <Route path="form" element={<Step2_Form />} />
        <Route path="doctors" element={<Step3_Doctor />} />
        <Route path="agreement" element={<Step4_Agreement />} />
        <Route path="payment" element={<Step5_Payment />} />
        <Route path="success" element={<Step6_Confirmation />} />
      </Routes>
    </div>
  );
};

export default RegistrationRoutes;
