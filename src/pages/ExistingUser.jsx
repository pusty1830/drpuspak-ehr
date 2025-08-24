import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getAllPatientDetails, getAllUser } from "../services/services";
import { useRegistration } from "../context/RegistrationContext";

const ExistingUser = () => {
  const [users, setUsers] = useState([]); // store multiple users
  const [selectedUser, setSelectedUser] = useState(null); // store which user was chosen
  const [bookingDate, setBookingDate] = useState(""); // ✅ store booking date
  const [listVisible, setListVisible] = useState(false);
  const navigate = useNavigate();

  // ✅ Validation schema
  const validationSchema = Yup.object({
    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits")
      .required("Mobile number is required"),
  });

  // ✅ Voice Input
  const handleVoiceInput = (setFieldValue) => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Your browser does not support voice input.");
      return;
    }
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-IN";
    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript.replace(/\s/g, "");
      setFieldValue("mobile", spokenText);
    };
    recognition.start();
  };

  // ✅ Submit handler (fetch users by mobile)
  const handleSubmit = async (values) => {
    try {
      const payload = {
        data: {
          filter: "",
          role: "User",
          phoneNumber: values.mobile,
        },
        page: 0,
        pageSize: 50,
        order: [["createdAt", "ASC"]],
      };

      // 1️⃣ Get all users (name, mobile, id)
      const response = await getAllUser(payload);
      console.log("User API Response:", response);

      const users = response?.data?.data?.rows || [];

      // 2️⃣ For each user, fetch patient details
      const detailedUsers = await Promise.all(
        users.map(async (u) => {
          try {
            const patientPayload = {
              data: {
                filter: "",
                userId: u.id,
              },
              page: 0,
              pageSize: 50,
              order: [["createdAt", "ASC"]],
            };

            const patientRes = await getAllPatientDetails(patientPayload);
            const patientInfo = patientRes?.data?.data?.rows?.[0] || {};

            return {
              id: u.id,
              name: u.userName, // from getAllUser
              mobileNumber: u.phoneNumber, // from getAllUser
              parentName: patientInfo.guirdianName,
              age: patientInfo.age,
              gender: patientInfo.gender,
              bloodGroup: patientInfo.bloodgroup,
              address: patientInfo.adress,
            };
          } catch (err) {
            console.error(
              "Error fetching patient details for user:",
              u.id,
              err
            );
            return {
              id: u.id,
              name: u.name,
              mobileNumber: u.phoneNumber,
            };
          }
        })
      );

      // 3️⃣ Save merged data
      setUsers(detailedUsers);
      setListVisible(true);
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("Failed to fetch users. Please try again.");
    }
  };

  // ✅ Proceed with selected user & bookingDate
  const handleProceed = () => {
    if (!selectedUser) {
      alert("Please select a user first.");
      return;
    }
    if (!bookingDate) {
      alert("Please select a booking date.");
      return;
    }

    navigate("/doctors", { state: { userId: selectedUser, bookingDate } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-lg w-full">
        {!listVisible ? (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
              Existing User Login
            </h2>

            <Formik
              initialValues={{ mobile: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ setFieldValue }) => (
                <Form className="space-y-5">
                  <div>
                    <label className="block mb-2 font-medium text-gray-700">
                      Registered Mobile Number
                    </label>
                    <div className="flex gap-2">
                      <Field
                        type="tel"
                        name="mobile"
                        placeholder="Enter your mobile number"
                        className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring focus:ring-blue-300"
                      />
                      <button
                        type="button"
                        onClick={() => handleVoiceInput(setFieldValue)}
                        className="bg-blue-500 text-white px-4 rounded-lg hover:bg-blue-600"
                      >
                        🎤
                      </button>
                    </div>
                    <ErrorMessage
                      name="mobile"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-700 font-medium"
                  >
                    Next
                  </button>
                </Form>
              )}
            </Formik>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
              Select a User
            </h2>
            <div className="space-y-4">
              {users.length > 0 ? (
                users.map((user) => (
                  <div
                    key={user.id}
                    onClick={() => setSelectedUser(user.id)}
                    className={`cursor-pointer p-4 border rounded-lg shadow-sm transition ${
                      selectedUser === user.id
                        ? "bg-blue-100 border-blue-500"
                        : "bg-gray-50 hover:bg-blue-50"
                    }`}
                  >
                    <p>
                      <strong>Name:</strong> {user.name}
                    </p>
                    <p>
                      <strong>Mobile:</strong> {user.mobileNumber}
                    </p>
                    <p>
                      <strong>Parent Name:</strong> {user.parentName || "-"}
                    </p>
                    <p>
                      <strong>Age:</strong> {user.age || "-"}
                    </p>
                    <p>
                      <strong>Gender:</strong> {user.gender || "-"}
                    </p>
                    <p>
                      <strong>Blood Group:</strong> {user.bloodGroup || "-"}
                    </p>
                    <p>
                      <strong>Address:</strong> {user.address || "-"}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-600">No users found.</p>
              )}
            </div>

            {/* ✅ Booking Date Field */}
            <div className="mt-6">
              <label className="block mb-2 font-semibold text-gray-700">
                Booking Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                min={new Date().toISOString().split("T")[0]} // disable past dates
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                className="w-full border p-3 rounded-lg shadow-sm border-gray-400 outline-none"
              />
            </div>

            <button
              onClick={handleProceed}
              className="mt-6 w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 font-medium"
            >
              Proceed to Doctor
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ExistingUser;
