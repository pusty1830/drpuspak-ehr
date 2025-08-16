import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegistrationRoutes from "./routes/RegistrationRoutes";
import ExistingUser from "./pages/ExistingUser";
import Home from "./pages/HOme";
import DoctorLogin from "./pages/doctor/DoctorLogin";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import Navbar from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import Layout from "./components/shared/Layout";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<RegistrationRoutes />} />
          <Route path="*" element={<div>404 Not Found</div>} />
          <Route path="/existing-user" element={<ExistingUser />} />
          <Route path="/doctor/login" element={<DoctorLogin />} />
          <Route path="/doctor/dashboard/" element={<DoctorDashboard />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
