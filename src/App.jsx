import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegistrationRoutes from "./routes/RegistrationRoutes";
import ExistingUser from "./pages/ExistingUser";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import Layout from "./components/shared/Layout";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/doctor/DoctorLogin";
import { ToastContainer } from "react-toastify";
import { RegistrationProvider } from "./context/RegistrationContext"; // ⬅️ import

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Wrap only registration-related routes with Provider */}
          <Route
             path="/register/*"
            element={
              <RegistrationProvider>
                <RegistrationRoutes />
              </RegistrationProvider>
            }
          />

          <Route path="*" element={<div>404 Not Found</div>} />
          <Route path="/existing-user" element={<ExistingUser />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/doctor/dashboard/"
            element={<PrivateRoute component={DoctorDashboard} />}
          />
        </Route>
      </Routes>

      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
