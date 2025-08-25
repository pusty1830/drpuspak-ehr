// src/pages/doctor/DoctorLogin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { signIn } from "../services/services";
import { setCurrentAccessToken } from "../services/axiosClient";
import {
  FaHospital,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

// ✅ Validation schema
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); // 👁️ State for password visibility

  const handleSubmit = async (values, { setSubmitting }) => {
    const payload = {
      email: values.email,
      password: values.password,
    };

    try {
      const res = await signIn(payload);

      if (res?.statusText === "OK") {
        setCurrentAccessToken(res?.data?.data?.accessToken);
        if (res?.data?.data?.role === "Doctor") {
          window.location.href = "/doctor/dashboard";
        } else if (res?.data?.data?.role === "Admin") {
          window.location.href = "/admin";
        } else {
          window.location.href = "/reminder";
        }
      } else {
        alert(res?.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-50 min-h-screen px-4">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white mx-auto mb-3">
            <FaHospital className="text-3xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Login </h2>
          <p className="text-gray-500 text-sm">Access your medical dashboard</p>
        </div>

        {/* Formik Form */}
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  Email
                </label>
                <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
                  <FaEnvelope className="text-gray-400 mr-2" />
                  <Field
                    type="email"
                    name="email"
                    className="flex-1 outline-none bg-transparent text-sm"
                    placeholder="Enter your email"
                  />
                </div>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  Password
                </label>
                <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400 relative">
                  <FaLock className="text-gray-400 mr-2" />
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="flex-1 outline-none bg-transparent text-sm"
                    placeholder="Enter your password"
                  />
                  {/* 👁️ Toggle button */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Remember & Forgot */}
              <div className="flex justify-between items-center text-sm">
                <label className="flex items-center gap-2">
                  <Field
                    type="checkbox"
                    name="remember"
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                  Remember me
                </label>
                <a href="#" className="text-blue-600 hover:underline">
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition font-semibold flex justify-center items-center"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4 mr-2"></span>
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </button>
            </Form>
          )}
        </Formik>

        {/* Footer */}
        <div className="text-center mt-6 text-sm">
          <p className="text-gray-500">
            New to the platform?{" "}
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-semibold hover:underline"
            >
              Contact admin
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
