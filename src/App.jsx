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
import PrescriptionPage from "./pages/doctor/PrescriptionPage";
import Dashboard from "./pages/Admin";
import DoctorTable from "./pages/Admin/Doctor";
import ReminderTable from "./pages/Admin/Reminder";

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
            element={
              <PrivateRoute
                component={DoctorDashboard}
                allowedRoles={["Doctor"]}
              />
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute component={Dashboard} allowedRoles={["Admin"]} />
            }
          />
          <Route
            path="/admin/doctor/"
            element={
              <PrivateRoute component={DoctorTable} allowedRoles={["Admin"]} />
            }
          />
          <Route
            path="/download/data/"
            element={
              <PrivateRoute
                component={ReminderTable}
                allowedRoles={["Admin", "Doctor"]}
              />
            }
          />
          <Route path="/prescription" element={<PrescriptionPage />} />
        </Routes>
      </main>
      <Footer />
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
