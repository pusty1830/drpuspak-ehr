import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegistrationRoutes from "./routes/RegistrationRoutes";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register/*" element={<RegistrationRoutes />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
