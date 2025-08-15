// src/pages/doctor/DoctorLogin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doctorApi } from "../../services/doctorApi";

const DoctorLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await doctorApi.login(form);
    setLoading(false);
    if (res.ok) {
      localStorage.setItem("doctor", JSON.stringify(res.doctor));
      navigate("/doctor/dashboard");
    } else {
      alert(res.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-teal-50 relative overflow-hidden">
      {/* Medical-themed background elements */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Stethoscope SVG */}
          <path 
            d="M20,50 Q30,30 40,50 Q50,70 60,50 Q70,30 80,50" 
            stroke="currentColor" 
            strokeWidth="1" 
            fill="none"
            className="text-blue-200"
          />
          <circle cx="20" cy="50" r="3" fill="currentColor" className="text-blue-300" />
          <circle cx="80" cy="50" r="3" fill="currentColor" className="text-blue-300" />
          <path 
            d="M80,50 Q85,55 90,50 Q95,45 100,50" 
            stroke="currentColor" 
            strokeWidth="1" 
            fill="none"
            className="text-blue-200"
          />
        </svg>
      </div>

      {/* Cross pattern in background */}
      <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 opacity-5">
        {Array.from({ length: 100 }).map((_, i) => (
          <div key={i} className="flex items-center justify-center">
            <svg viewBox="0 0 10 10" width="10" height="10" className="text-blue-300">
              <path d="M1,1 L9,9 M9,1 L1,9" stroke="currentColor" strokeWidth="0.5" />
            </svg>
          </div>
        ))}
      </div>

      <div className="relative w-full max-w-md bg-white rounded-xl shadow-lg p-8 mx-4 backdrop-blur-sm bg-opacity-90 border border-blue-100">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-blue-600">
                <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 014.653-2.52.75.75 0 00-.65-1.352 56.129 56.129 0 00-4.78 2.589 1.5 1.5 0 01-.71.547c-.396.126-.636.525-.484.92a59.23 59.23 0 002.02 4.78.75.75 0 01-1.18.925 60.73 60.73 0 00-2.1-5.126.75.75 0 01.183-1.044A60.653 60.653 0 0111.7 2.805z" />
                <path d="M13.06 15.473a48.45 48.45 0 017.666-3.282.75.75 0 01.218 1.397 48.683 48.683 0 00-7.924 3.307.75.75 0 01-.96-.622zM13.404 17.5a.75.75 0 01-.687.393 49.09 49.09 0 01-7.22-3.476.75.75 0 011.062-.96 47.59 47.59 0 016.846 3.294.75.75 0 01 0 .549z" />
              </svg>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-white">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-2 text-center text-gray-800">Doctor Portal</h2>
        <p className="text-center text-gray-500 mb-6">Access your medical dashboard</p>

        <form onSubmit={submit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-400">
                  <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
                </svg>
              </div>
              <input
                value={form.username}
                onChange={(e) => setForm({...form, username: e.target.value})}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="username or email"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-400">
                  <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                value={form.password}
                onChange={(e) => setForm({...form, password: e.target.value})}
                type="password"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="password"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                Forgot password?
              </a>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg font-semibold text-white shadow-md transition ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </span>
            ) : 'Sign in'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>New to the platform? <a href="#" className="font-medium text-blue-600 hover:text-blue-500">Contact admin</a></p>
        </div>
      </div>
    </div>
  );
};

export default DoctorLogin;