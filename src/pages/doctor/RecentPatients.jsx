import React, { useEffect, useState } from "react";
import { FiUser, FiFileText, FiClock, FiActivity } from "react-icons/fi";
import { motion } from "framer-motion";
import { getAllUser } from "../../services/services";

const RecentPatients = ({ patients = [], onOpenPatient, isLoading }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const payload = {
      data: { filter: "" },
      page: 0,
      pageSize: 50,
      order: [["createdAt", "ASC"]],
    };

    getAllUser(payload).then((res) => {
      const data = res?.data?.data?.rows || [];
      setUsers(data);
    });
  }, []);

  // Map prescription patients with real user info
  const enrichedPatients = patients.map((p) => {
    const user = users.find((u) => u.id === p.userId);
    console.log(user); // match by userId
    return {
      ...p,
      userName: user ? user.userName : p.userName || "Unknown",
    };
  });

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  console.log(enrichedPatients);
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
      <div className="p-5 border-b border-gray-100 bg-blue-50">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center">
          <FiUser className="mr-2 text-blue-600" />
          Recent Patients
          <span className="ml-auto text-sm font-normal bg-white text-blue-800 px-3 py-1 rounded-full">
            {isLoading ? "--" : enrichedPatients.length} records
          </span>
        </h3>
      </div>

      {isLoading ? (
        <div className="p-5 space-y-4 animate-pulse">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-200 mr-4"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
              <div className="w-20 h-8 bg-gray-200 rounded-full"></div>
            </div>
          ))}
        </div>
      ) : enrichedPatients.length === 0 ? (
        <div className="p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
            <FiUser className="text-gray-400 text-2xl" />
          </div>
          <h4 className="text-gray-500 font-medium">No recent patients</h4>
          <p className="text-gray-400 text-sm mt-1">
            Patient records will appear here
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
          {enrichedPatients.map((patient, index) => (
            <motion.li
              key={patient.patientId || index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="hover:bg-blue-50 transition-colors duration-150"
            >
              <div className="px-5 py-4 flex items-center">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <FiUser className="text-lg" />
                  </div>
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-900">
                      {patient.userName}
                    </h4>
                    <span className="text-xs text-gray-500 flex items-center">
                      <FiClock className="mr-1" />
                      Last visit: {formatDate(patient.lastVisit)}
                    </span>
                  </div>
                  <div className="flex items-center mt-1 text-xs text-gray-500">
                    <span className="flex items-center mr-3">
                      <FiActivity className="mr-1" />
                      {patient.condition || "General checkup"}
                    </span>
                    <span className="flex items-center">
                      <FiFileText className="mr-1" />
                      ID: {patient.userId}
                    </span>
                  </div>
                </div>
                <div className="ml-4 flex space-x-2">
                  <button
                    onClick={() => onOpenPatient(patient)}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                  >
                    Open
                  </button>
                  <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-full shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
                    <FiFileText className="mr-1" />
                    History
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

export default RecentPatients;
