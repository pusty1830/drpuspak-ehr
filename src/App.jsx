import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegistrationRoutes from "./routes/RegistrationRoutes";
import ExistingUser from "./pages/ExistingUser";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import Layout from "./components/shared/Layout";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import { RegistrationProvider } from "./context/RegistrationContext"; // ⬅️ import
import Footer from "./components/shared/Footer";
import Navbar from "./components/shared/Header";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="min-h-[calc(100vh-110px)]  ">
        <Routes>
          <Route
            path="/*"
            element={
              <RegistrationProvider>
                <RegistrationRoutes />
              </RegistrationProvider>
            }
          />
          <Route path="/existing-user" element={<ExistingUser />} />
          <Route path="/login" element={<Login />} /> {/* default */}
          <Route path="/login/:role" element={<Login />} /> {/* dynamic */}
          <Route
            path="/doctor/dashboard/"
            element={<PrivateRoute component={DoctorDashboard} />}
          />
        </Routes>
      </main>
      <Footer />
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
