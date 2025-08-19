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
      {/* <Navbar /> */}

      {/* Main Content */}
      <main className='min-h-[calc(100vh-110px)] '>
        <Outlet />
      </main>

      {/* Footer */}
      {/* <Footer /> */}
    </div>
  );
}

export default Layout;
