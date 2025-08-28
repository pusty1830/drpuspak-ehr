import React, { useEffect, useState } from "react";
import {
  FiUser,
  FiClock,
  FiAlertCircle,
  FiCheckCircle,
  FiChevronRight,
} from "react-icons/fi";
import { motion } from "framer-motion"; // ✅ You forgot to import motion
import { getAllPatientDetails, getAllUser } from "../../services/services";

const statusColors = {
  pending: "bg-amber-100 text-amber-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  missed: "bg-gray-100 text-gray-800",
};

const statusIcons = {
  pending: <FiClock className="mr-1" />,
  completed: <FiCheckCircle className="mr-1" />,
  cancelled: <FiAlertCircle className="mr-1" />,
  missed: <FiAlertCircle className="mr-1" />,
};

const TodayAppointments = ({ appointments = [], onViewPatient, isLoading }) => {
  const [enrichedAppointments, setEnrichedAppointments] = useState([]);

  useEffect(() => {
    if (!appointments.length) return;

    const fetchData = async () => {
      try {
        // Extract unique userIds
        const userIds = [...new Set(appointments.map((a) => a.userId))];

        // Fetch users in bulk
        const userPayload = {
          data: { filter: "", role: "User" },
          page: 0,
          pageSize: 100,
          order: [["createdAt", "ASC"]],
        };
        const userRes = await getAllUser(userPayload);
        const allUsers = userRes?.data?.data?.rows || [];
        const filteredUsers = allUsers.filter((u) => userIds.includes(u.id));

        // Fetch patients for each user
        const patientResList = await Promise.all(
          filteredUsers.map(async (u) => {
            const patientPayload = {
              data: { filter: "", userId: u.id },
              page: 0,
              pageSize: 10,
              order: [["createdAt", "ASC"]],
            };
            const res = await getAllPatientDetails(patientPayload);
            return { userId: u.id, ...(res?.data?.data?.rows?.[0] || {}) };
          })
        );

        // Merge appointments with user + patient info
        const merged = appointments.map((app) => {
          const user = filteredUsers.find((u) => u.id === app.userId);
          const patient = patientResList.find((p) => p.userId === app.userId);

          return {
            ...app,
            patientName: user?.userName || "Unknown",
            patientId: user?.id,
            mobile: user?.phoneNumber,
            age: patient?.age,
            gender: patient?.gender,
            bloodGroup: patient?.bloodGroup,
            address: patient?.address,
            // ✅ handle bookingDate safely
            bookingDate: app.bookingDate
              ? new Date(app.bookingDate).toISOString().split("T")[0]
              : null,
          };
        });
        setEnrichedAppointments(merged);
      } catch (err) {
        console.error("Error fetching users/patients:", err);
      }
    };

    fetchData();
  }, [appointments]);

  console.log(enrichedAppointments);
  // ✅ Format time properly from ISO date/time
  const formatTime = (isoString) => {
    if (!isoString) return "--";
    const date = new Date(isoString);

    // convert to IST manually
    const utcHours = date.getUTCHours();
    const utcMinutes = date.getUTCMinutes();

    // IST offset (+5:30)
    const istDate = new Date(date.getTime() + 5.5 * 60 * 60 * 1000);

    let hours = istDate.getHours();
    const minutes = istDate.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    return `${hours}:${minutes} ${ampm}`;
  };

  // Loading skeleton
  const LoadingSkeleton = () => (
    <div className="animate-pulse space-y-4 p-5">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-200 mr-4"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            <div className="h-3 bg-gray-200 rounded w-2/3"></div>
          </div>
          <div className="w-16 h-6 bg-gray-200 rounded-full"></div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-5 border-b border-gray-100 bg-blue-50">
        <h3 className="text-md md:text-xl font-semibold text-gray-800 flex items-center">
          <FiClock className="mr-2 text-blue-600 " />
          Today's Appointments
          <span className="ml-auto text-sm font-normal bg-blue-100 text-blue-800 md:px-3 py-1 px-2 rounded-full">
            {isLoading ? "--" : enrichedAppointments.length}{" "}
            {enrichedAppointments.length === 1 ? "appointment" : "appointments"}
          </span>
        </h3>
      </div>

      {isLoading ? (
        <LoadingSkeleton />
      ) : enrichedAppointments.length === 0 ? (
        <div className="p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
            <FiClock className="text-gray-400 text-2xl" />
          </div>
          <h4 className="text-gray-500 font-medium">No appointments today</h4>
          <p className="text-gray-400 text-sm mt-1">All caught up!</p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-100">
          {enrichedAppointments.map((appointment, index) => (
            <motion.li
              key={appointment.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="hover:bg-gray-50 transition-colors duration-150"
            >
              <div className="px-5 py-4 flex items-center">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <FiUser className="text-lg" />
                  </div>
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {appointment.patientName}
                    </h4>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ml-2 ${
                        statusColors[appointment.status]
                      } flex items-center`}
                    >
                      {/* {statusIcons[appointment.status]}
                      {appointment.status.charAt(0).toUpperCase() +
                        appointment.status.slice(1)} */}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 truncate mt-1">
                    {appointment.condition}
                  </p>
                  <div className="flex items-center mt-1 text-xs text-gray-400">
                    <span>Date: {appointment.bookingDate}</span>
                    <span className="mx-2">•</span>
                    <span>{formatTime(appointment.bookingDate)}</span>
                  </div>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <button
                    onClick={() =>
                      onViewPatient({
                        patientId: appointment.patientId,
                        name: appointment.patientName,
                        condition: appointment.condition,
                      })
                    }
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                  >
                    View
                    <FiChevronRight className="ml-1" />
                  </button>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodayAppointments;
