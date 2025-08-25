import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useMedia } from "use-media";

const COLORS = ["#3b82f6", "#f59e0b", "#10b981"];

export default function StudentStatsChart({ range }) {
  const isMobile = useMedia({ maxWidth: 768 });

  const data = [
    { month: "Jan", enrolled: 320, assignments: 45, exams: 210 },
    { month: "Feb", enrolled: 300, assignments: 38, exams: 198 },
    { month: "Mar", enrolled: 350, assignments: 40, exams: 220 },
    { month: "Apr", enrolled: 370, assignments: 30, exams: 250 },
    { month: "May", enrolled: 390, assignments: 28, exams: 275 },
    { month: "Jun", enrolled: 310, assignments: 35, exams: 180 },
    { month: "Jul", enrolled: 330, assignments: 32, exams: 205 },
    { month: "Aug", enrolled: 360, assignments: 29, exams: 230 },
    { month: "Sep", enrolled: 400, assignments: 27, exams: 260 },
    { month: "Oct", enrolled: 410, assignments: 22, exams: 280 },
    { month: "Nov", enrolled: 395, assignments: 20, exams: 240 },
    { month: "Dec", enrolled: 380, assignments: 25, exams: 225 },
  ];

  // Take last month’s data for mobile PieChart
  const latest = data[data.length - 1];
  const pieData = [
    { name: "Total Students", value: latest.enrolled },
    { name: "Pending Assignments", value: latest.assignments },
    { name: "Exams Given", value: latest.exams },
  ];

  return (
    <div className="bg-white rounded-lg shadow-xl p-4">
      {isMobile ? (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
            barCategoryGap={12}
            barSize={8}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" fontSize={12} stroke="#9ca3af" />
            <YAxis fontSize={12} stroke="#9ca3af" />
            <Tooltip contentStyle={{ fontSize: 12 }} />
            <Legend verticalAlign="top" height={36} />
            <Bar
              dataKey="enrolled"
              stackId="a"
              fill="#3b82f6"
              name="Total Students"
            />
            <Bar
              dataKey="assignments"
              stackId="a"
              fill="#f59e0b"
              name="Pending Assignments"
            />
            <Bar
              dataKey="exams"
              stackId="a"
              fill="#10b981"
              name="Exams Given"
            />
          </BarChart>
        </ResponsiveContainer>
      )}

      {/* Legend */}
      <div className="flex justify-center mt-3 text-sm space-x-4 flex-wrap">
        <div className="flex items-center space-x-1">
          <span className="w-3 h-3 rounded-full bg-blue-500 inline-block" />
          Total Students
        </div>
        <div className="flex items-center space-x-1">
          <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block" />
          Pending Assignments
        </div>
        <div className="flex items-center space-x-1">
          <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
          Exams Given
        </div>
      </div>
    </div>
  );
}
