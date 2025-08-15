import React from "react";
import { FiUser, FiClock, FiAlertCircle, FiCheckCircle, FiChevronRight } from "react-icons/fi";
import { motion } from "framer-motion";

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

const TodayAppointments = ({ appointments = [], onViewPatient, isLoading, refreshData }) => {
  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    return `${hour > 12 ? hour - 12 : hour}:${minutes} ${hour >= 12 ? 'PM' : 'AM'}`;
  };

  // Custom loading skeleton component
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
        <h3 className="text-xl font-semibold text-gray-800 flex items-center">
          <FiClock className="mr-2 text-blue-600" />
          Today's Appointments
          <span className="ml-auto text-sm font-normal bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
            {isLoading ? '--' : appointments.length} {appointments.length === 1 ? 'appointment' : 'appointments'}
          </span>
        </h3>
      </div>

      {isLoading ? (
        <LoadingSkeleton />
      ) : appointments.length === 0 ? (
        <div className="p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
            <FiClock className="text-gray-400 text-2xl" />
          </div>
          <h4 className="text-gray-500 font-medium">No appointments today</h4>
          <p className="text-gray-400 text-sm mt-1">All caught up!</p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-100">
          {appointments.map((appointment, index) => (
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
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ml-2 ${statusColors[appointment.status]} flex items-center`}>
                      {statusIcons[appointment.status]}
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 truncate mt-1">
                    {appointment.condition}
                  </p>
                  <div className="flex items-center mt-1 text-xs text-gray-400">
                    <span>ID: {appointment.patientId}</span>
                    <span className="mx-2">•</span>
                    <span>{formatTime(appointment.time)}</span>
                  </div>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <button
                    onClick={() => onViewPatient({ 
                      patientId: appointment.patientId, 
                      name: appointment.patientName,
                      condition: appointment.condition
                    })}
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