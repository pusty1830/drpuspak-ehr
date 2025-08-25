// src/pages/doctor/DoctorDashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TodayAppointments from "./TodayAppointments";
import RecentPatients from "./RecentPatients";
import EPrescription from "./EPrescription";
import {
  FiLogOut,
  FiCalendar,
  FiUsers,
  FiUser,
  FiClock,
  FiChevronRight,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import {
  getAllBooking,
  getAllDoctor,
  getAllPrescription,
  getDoctorDetailswithuserId,
} from "../../services/services";
import { getUserId } from "../../services/axiosClient";

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [view, setView] = useState("today");
  const [appointments, setAppointments] = useState([]);
  const [recentPatients, setRecentPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [doctor, setDoctor] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    todayCount: 0,
    recentCount: 0,
    completed: 0,
  });

  // get Doctor Details
  useEffect(() => {
    const Payload = {
      data: { filter: "", id: getUserId() },
      page: 0,
      pageSize: 50,
      order: [["createdAt", "ASC"]],
    };

    getAllDoctor(Payload)
      .then((res) => {
        console.log(res);
        const firstDoctor = res?.data?.data?.rows?.[0];

        if (firstDoctor) {
          // Set doctor name from first API
          const doctorName = firstDoctor.userName || "";

          // Then fetch details from second API with userId
          getDoctorDetailswithuserId(firstDoctor.id).then((detailRes) => {
            const details = detailRes?.data?.data || {};
            console.log(details);

            setDoctor({
              name: doctorName,
              dept: details.dept,
            });
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching doctor info:", error);
      });
  }, []);

  // get Booking Details
  useEffect(() => {
    const today = new Date();
    const todayUTC = new Date(
      Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())
    );

    const Payload = {
      data: {
        filter: "",
        doctorId: getUserId(),
        bookingDate: todayUTC,
      },
      page: 0,
      pageSize: 50,
      order: [["createdAt", "ASC"]],
    };

    getAllBooking(Payload)
      .then((res) => {
        setAppointments(res?.data?.data?.rows || []);
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const payload = {
      data: {
        filter: "",
        doctorId: getUserId(),
      },
      page: 0,
      pageSize: 50,
      order: [["createdAt", "ASC"]],
    };

    getAllPrescription(payload)
      .then((res) => {
        const prescriptions = res?.data?.data?.rows || [];

        // ✅ Today's prescriptions
        const todaysPrescriptions = prescriptions.filter((p) =>
          isToday(p.createdAt)
        );

        // ✅ Patients who already have today's prescription
        const todaysUserIds = todaysPrescriptions.map((p) => p.userId);

        // ✅ Filter out from appointments
        const todaysAppointmentsWithoutPrescription = appointments.filter(
          (appt) => !todaysUserIds.includes(appt.patientId)
        );

        setAppointments(todaysAppointmentsWithoutPrescription);
        setRecentPatients(todaysPrescriptions);
      })
      .catch((err) => console.error("Error fetching prescriptions:", err));
  }, [appointments]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      console.log("jihugy");
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const openPrescription = (patient) => {
    setSelectedPatient(patient);
  };

  const closePrescription = () => setSelectedPatient(null);

  const savePrescription = async (presc) => {
    try {
      console.log("jihugyftd");
    } catch (error) {
      console.error("Error saving prescription:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6  md:pt-10 ">
      <div className="max-w-7xl mx-auto pt-10">
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Welcome, {doctor.name}
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Department:{" "}
              <span className="font-medium">
                {doctor.dept || "General Medicine"}
              </span>
            </p>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-blue-500"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Today's Appointments</p>
                <p className="text-2xl font-bold text-gray-800">
                  {appointments.length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <FiCalendar className="text-xl" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-green-500"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Recent Patients</p>
                <p className="text-2xl font-bold text-gray-800">
                  {isLoading ? "--" : stats.recentCount}
                </p>
              </div>
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <FiUsers className="text-xl" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-purple-500"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Completed Today</p>
                <p className="text-2xl font-bold text-gray-800">
                  {isLoading ? "--" : stats.completed}
                </p>
              </div>
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <FiClock className="text-xl" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm p-1 mb-6">
          <div className="flex gap-1">
            <button
              className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-colors duration-200 flex-1 justify-center ${
                view === "today"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setView("today")}
            >
              <FiCalendar />
              <span>Today Appointments</span>
            </button>
            <button
              className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-colors duration-200 flex-1 justify-center ${
                view === "recent"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setView("recent")}
            >
              <FiUser />
              <span>Recent Patients</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 gap-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {view === "today" && (
                <TodayAppointments
                  appointments={appointments}
                  onViewPatient={openPrescription}
                  isLoading={isLoading}
                  refreshData={fetchData}
                />
              )}
              {view === "recent" && (
                <RecentPatients
                  patients={recentPatients}
                  onOpenPatient={openPrescription}
                  isLoading={isLoading}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Prescription Modal / Side panel */}
        <AnimatePresence>
          {selectedPatient && (
            <EPrescription
              patient={selectedPatient}
              onClose={closePrescription}
              onSave={savePrescription}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DoctorDashboard;
