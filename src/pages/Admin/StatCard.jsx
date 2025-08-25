import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import MiniChart from "./MiniChart";

export default function StatCard({
  icon,
  label,
  value,
  percentage,
  isIncrease,
  chart,
}) {
  return (
    <div className="relative  max-w-[300px] rounded-lg shadow-xl overflow-hidden w-full md:w-1/2 lg:w-60 p-2 bg-white transition-all ">
      {/* Subtle Background Image Overlay */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url()`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Color Overlay Shape */}
      <div
        className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-10 blur-lg"
        style={{ backgroundColor: chart }}
      />

      {/* Top: Icon + Label + Badge */}
      <div className="flex justify-between items-center mb-3 relative z-10">
        <div className="flex items-center space-x-2">
          <div
            className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full shadow-inner"
            style={{ backgroundColor: chart }}
          >
            <span className="text-base sm:text-lg">{icon}</span>
          </div>
          <span className="text-gray-600 text-xs sm:text-sm font-medium">
            {label}
          </span>
        </div>
        <div
          className={`px-1.5 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold ${
            isIncrease
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {isIncrease ? `+${percentage}%` : `-${percentage}%`}
        </div>
      </div>

      {/* Middle: Value + Chart Row */}
      <div className="flex items-center justify-between relative z-10 mb-3">
        <div className="text-xl sm:text-2xl font-bold text-gray-800">
          {value}
        </div>
        <div className="w-20 h-10 sm:w-24 sm:h-12 rounded-md overflow-hidden">
          <MiniChart color={chart} />
        </div>
      </div>

      {/* Bottom: Trend */}
      <div className="flex items-center space-x-1 relative z-10">
        {isIncrease ? (
          <FaArrowUp className="text-green-500 text-xs sm:text-sm" />
        ) : (
          <FaArrowDown className="text-red-500 text-xs sm:text-sm" />
        )}
        <span className="text-[10px] sm:text-xs text-gray-400">
          in last 7 Days
        </span>
      </div>
    </div>
  );
}
