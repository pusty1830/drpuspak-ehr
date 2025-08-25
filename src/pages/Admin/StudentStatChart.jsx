import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function StudentStatsChart({ range, stats }) {
  const [isMobile, setIsMobile] = useState(false);

  // detect screen width
  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768); // < 768px = mobile
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // convert stats to chart data
  const data = stats.map((s) => ({
    name: s.label,
    value: Number(String(s.value).replace(/[^\d]/g, "")) || 0,
  }));

  const colors = ["#6366F1", "#2563EB", "#DC2626", "#16A34A"];

  return (
    <div className="w-full h-64">
      <ResponsiveContainer>
        {isMobile ? (
          // 📱 Pie Chart for phone
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        ) : (
          // 💻 Line Chart for desktop
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#6366F1"
              strokeWidth={2}
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
