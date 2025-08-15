import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegistrationRoutes from "./routes/RegistrationRoutes";
import ExistingUser from "./pages/ExistingUser";
import Home from "./pages/HOme";
import DoctorLogin from "./pages/doctor/DoctorLogin";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register/*" element={<RegistrationRoutes />} />
        <Route path="*" element={<div>404 Not Found</div>} />
        <Route path="/existing-user" element={<ExistingUser />} />
        <Route path="/" element={<Home />} />
        <Route path="/doctor/login" element={<DoctorLogin />} />
        <Route path="/doctor/dashboard/" element={<DoctorDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
