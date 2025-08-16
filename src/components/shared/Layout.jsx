import { Outlet } from "react-router-dom";
import Navbar from "../shared/Header"; // adjust path if needed
import Footer from "../shared/Footer"; // adjust path if needed

function Layout() {
  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header/Navbar */}
      <Navbar />

      {/* Main Content */}
      <main style={{ flexGrow: 1, marginTop: "0px" }}>
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Layout;
