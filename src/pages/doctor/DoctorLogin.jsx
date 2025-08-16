// src/pages/doctor/DoctorLogin.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { signIn } from "../../services/services";
import { setCurrentAccessToken } from "../../services/axiosClient";

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

  const handleSubmit = async (values, { setSubmitting }) => {
    const payload = {
      email: values.email,
      password: values.password,
    };

    try {
      const res = await signIn(payload);
      console.log("Login response:", res);

      if (res?.statusText === "OK") {
        setCurrentAccessToken(res?.data?.data?.accessToken);
        console.log(res);
        if (res?.data?.role === "Doctor") {
          window.location.href = "/doctor/dashboard";
        } else if (res?.data?.role === "Admin") {
          window.location.href = "/reminder";
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
    <div className="d-flex justify-content-center bg-light min-vh-100 py-5">
      <div
        className="card shadow-lg p-4 my-5"
        style={{ maxWidth: "420px", width: "100%" }}
      >
        {/* Header */}
        <div className="text-center mb-4">
          <div
            className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-2"
            style={{ width: "70px", height: "70px" }}
          >
            <i className="bi bi-hospital fs-2"></i>
          </div>
          <h2 className="fw-bold">Doctor Portal</h2>
          <p className="text-muted">Access your medical dashboard</p>
        </div>

        {/* Formik Form */}
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              {/* Email */}
              <div className="mb-3">
                <label className="form-label">Email</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-envelope"></i>
                  </span>
                  <Field
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email"
                  />
                </div>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-danger small mt-1"
                />
              </div>

              {/* Password */}
              <div className="mb-3">
                <label className="form-label">Password</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-lock"></i>
                  </span>
                  <Field
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter your password"
                  />
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-danger small mt-1"
                />
              </div>

              {/* Remember & Forgot */}
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="form-check">
                  <input
                    type="checkbox"
                    id="remember"
                    className="form-check-input"
                  />
                  <label htmlFor="remember" className="form-check-label">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-decoration-none">
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary w-100"
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
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
        <div className="text-center mt-3">
          <small className="text-muted">
            New to the platform?{" "}
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none fw-semibold"
            >
              Contact admin
            </a>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Login;
