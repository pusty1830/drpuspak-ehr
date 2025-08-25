import { useState } from "react";
import StudentStatsChart from "./StudentStatChart";

export default function StudentStatsCard({ stats }) {
  const [range, setRange] = useState("Monthly");

  return (
    <div className="bg-white rounded-lg p-4 sm:p-6 shadow-xl w-full max-w-screen-xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <h3 className="text-base sm:text-lg font-semibold">
          Dashboard Overview
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

      {/* Stat Cards (4 in grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-4 rounded bg-gray-50 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center">
              <div className="bg-indigo-500 p-2 rounded-full mr-3 text-white text-xl">
                {item.icon}
              </div>
              <div>
                <div className="font-semibold text-gray-800">{item.value}</div>
                <div className="text-xs text-gray-500">{item.label}</div>
              </div>
            </div>
            <div
              className={`text-sm font-medium ${
                item.isIncrease ? "text-green-600" : "text-red-600"
              }`}
            >
              {item.isIncrease ? "▲" : "▼"} {item.percentage}%
            </div>
          </div>
        ))}
      </div>

      {/* Chart (shared) */}
      <StudentStatsChart range={range} stats={stats} />
    </div>
  );
}
