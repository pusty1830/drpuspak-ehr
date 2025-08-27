import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getAllPatientDetails, getAllUser } from "../services/services";

const ExistingUser = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [bookingDate, setBookingDate] = useState("");
  const [listVisible, setListVisible] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, "Must be exactly 10 digits")
      .required("Mobile number is required"),
  });

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
      if (spokenText.length === 10) {
        checkUserExists(spokenText);
      }
    };
    recognition.start();
  };

  const checkUserExists = async (mobile) => {
    try {
      const payload = {
        data: { filter: "", role: "User", phoneNumber: mobile },
        page: 0,
        pageSize: 50,
        order: [["createdAt", "ASC"]],
      };
      const response = await getAllUser(payload);
      const users = response?.data?.data?.rows || [];

      if (users.length === 0) {
        setUserNotFound(true);
        setUsers([]);
        setListVisible(false);
        return;
      }

      const detailedUsers = await Promise.all(
        users.map(async (u) => {
          try {
            const patientPayload = {
              data: { filter: "", userId: u.id },
              page: 0,
              pageSize: 50,
              order: [["createdAt", "ASC"]],
            };

            const patientRes = await getAllPatientDetails(patientPayload);
            const patientInfo = patientRes?.data?.data?.rows?.[0] || {};

            return {
              id: u.id,
              name: u.userName,
              mobileNumber: u.phoneNumber,
              parentName: patientInfo.guirdianName,
              age: patientInfo.age,
              gender: patientInfo.gender,
              bloodGroup: patientInfo.bloodgroup,
              address: patientInfo.adress,
            };
          } catch {
            return { id: u.id, name: u.userName, mobileNumber: u.phoneNumber };
          }
        })
      );

      setUsers(detailedUsers);
      setUserNotFound(false);
      setListVisible(true);
    } catch (err) {
      setUserNotFound(true);
      setUsers([]);
    }
  };

  const handleSubmit = async (values) => {
    if (userNotFound) {
      navigate("/"); // user not found → go home
    } else {
      await checkUserExists(values.mobile); // normal flow
    }
  };

  const handleProceed = () => {
    if (!selectedUser) {
      alert("Please select a user first.");
      return;
    }
    if (!bookingDate) {
      alert("Please select a booking date.");
      return;
    }
    navigate("/doctors", {
      state: { userId: selectedUser.id, userName: selectedUser.name, bookingDate },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-4 sm:p-6">
        {!listVisible ? (
          <>
            <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center text-gray-800">
              Existing User Login
            </h2>
            <Formik initialValues={{ mobile: "" }} validationSchema={validationSchema} onSubmit={handleSubmit}>
              {({ setFieldValue, values }) => (
                <Form className="space-y-5">
                  <div>
                    <label className="block mb-2 font-medium text-gray-700 text-sm sm:text-base">
                      Registered Mobile Number
                    </label>
                    <div className="flex gap-2">
                      <Field
                        type="tel"
                        name="mobile"
                        placeholder="Enter 10-digit number"
                        maxLength="10"
                        className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring focus:ring-blue-300 text-sm sm:text-base"
                        onChange={(e) => {
                          setFieldValue("mobile", e.target.value);
                          if (e.target.value.length === 10) {
                            checkUserExists(e.target.value);
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => handleVoiceInput(setFieldValue)}
                        className="bg-blue-500 text-white px-3 sm:px-4 rounded-lg hover:bg-blue-600 text-lg"
                      >
                        🎤
                      </button>
                    </div>
                    <ErrorMessage name="mobile" component="div" className="text-red-500 text-sm mt-1" />
                    {userNotFound && values.mobile.length === 10 && (
                      <p className="text-red-500 text-sm mt-2">User not found. You can register as a new user.</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-700 font-medium text-sm sm:text-base"
                  >
                    Next
                  </button>
                </Form>
              )}
            </Formik>
          </>
        ) : (
          <>
            <h2 className="text-lg sm:text-xl font-bold mb-4 text-gray-800 text-center">
              Select a User
            </h2>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
              {users.length > 0 ? (
                users.map((user) => (
                  <div
                    key={user.id}
                    onClick={() => setSelectedUser(user)}
                    className={`cursor-pointer p-4 border rounded-lg shadow-sm text-sm sm:text-base transition ${
                      selectedUser?.id === user.id
                        ? "bg-blue-50 border-blue-500 ring-2 ring-blue-400"
                        : "bg-gray-50 hover:bg-blue-50"
                    }`}
                  >
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Mobile:</strong> {user.mobileNumber}</p>
                    <p><strong>Parent Name:</strong> {user.parentName || "-"}</p>
                    <p><strong>Age:</strong> {user.age || "-"}</p>
                    <p><strong>Gender:</strong> {user.gender || "-"}</p>
                    <p><strong>Blood Group:</strong> {user.bloodGroup || "-"}</p>
                    <p><strong>Address:</strong> {user.address || "-"}</p>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-600">No users found.</p>
              )}
            </div>

            <div className="mt-6">
              <label className="block mb-2 font-semibold text-gray-700 text-sm sm:text-base">
                Booking Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                min={new Date().toISOString().split("T")[0]}
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                className="w-full border p-3 rounded-lg shadow-sm border-gray-300 outline-none text-sm sm:text-base"
              />
            </div>

            <button
              onClick={handleProceed}
              className="mt-6 w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 font-medium text-sm sm:text-base"
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
