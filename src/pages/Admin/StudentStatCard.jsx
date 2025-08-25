import {
  FaUserGraduate,
  FaClipboardList,
  FaExclamationTriangle,
  FaCheckCircle,
} from "react-icons/fa";
import { useState } from "react";
import StudentStatsChart from "./StudentStatChart";

export default function StudentStatsCard() {
  const [range, setRange] = useState("Monthly");

  const stats = [
    {
      label: "Total Enrolled Students",
      value: "2,340",
      icon: <FaUserGraduate />,
      color: "text-blue-600",
    },
    {
      label: "Pending Assignments",
      value: "128",
      icon: <FaClipboardList />,
      color: "text-red-600",
    },
    {
      label: "Completed Exams",
      value: "520",
      icon: <FaCheckCircle />,
      color: "text-green-600",
    },
    {
      label: "Low Attendance Alerts",
      value: "15",
      icon: <FaExclamationTriangle />,
      color: "text-yellow-500",
    },
  ];

  return (
    <div className="bg-white rounded-lg p-4 sm:p-6 shadow-xl w-full max-w-screen-xl mx-auto">
      {/* Header: Title + Dropdown */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <h3 className="text-base sm:text-lg font-semibold">
          Student Statistics Overview
        </h3>
        <select
          className="border rounded px-2 py-1 text-sm focus:outline-none"
          value={range}
          onChange={(e) => setRange(e.target.value)}
        >
          <option>Daily</option>
          <option>Weekly</option>
          <option>Monthly</option>
        </select>
      </div>

      {/* Stat Cards */}
      <div className="flex flex-wrap justify-center md:grid md:grid-cols-4 gap-4 mb-4">
        {stats.map((item, idx) => (
          <div
            key={idx}
            className="w-full max-w-xs flex items-center p-4 rounded bg-gray-50 shadow-sm hover:shadow-md transition-all"
          >
            <div className={`${item.color} mr-3 text-xl sm:text-2xl`}>
              {item.icon}
            </div>
            <div>
              <div className="text-xs sm:text-sm text-gray-500">
                {item.label}
              </div>
              <div className="font-semibold text-sm sm:text-base text-gray-800">
                {item.value}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <StudentStatsChart range={range} />
    </div>
  );
}
