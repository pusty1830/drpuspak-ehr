import StatCard from "./Admin/StatCard";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaClipboardList,
  FaUserCheck,
} from "react-icons/fa";
import StudentStatsCard from "./Admin/StudentStatCard";
import AllUsersTable from "./Admin/AllUser";
import DashboardCards from "./Admin/DashboardCard";

export default function Dashboard() {
  const stats = [
    {
      icon: <FaUserGraduate className="text-white" />,
      label: "Total Students",
      value: "2,340",
      percentage: 12,
      isIncrease: true,
      chart: "rgba(79, 70, 229, 1)",
    },
    {
      icon: <FaChalkboardTeacher className="text-white" />,
      label: "Active Teachers",
      value: "128",
      percentage: 5,
      isIncrease: true,
      chart: "rgba(37, 99, 235, 1)", // darker blue
    },
    {
      icon: <FaClipboardList className="text-white" />,
      label: "Exam Given",
      value: "67",
      percentage: 10,
      isIncrease: true,
      chart: "rgba(220, 38, 38, 1)", // red
    },
    {
      icon: <FaUserCheck className="text-white" />,
      label: "Average Attendance Today",
      value: "89%",
      percentage: 3,
      isIncrease: true,
      chart: "rgba(22, 163, 74, 1)", // green
    },
  ];

  return (
    <div className="mx-auto p-4 w-full md:w-full">
      <h2 className="text-xl font-semibold mb-4">Education Dashboard</h2>

      <div className=" w-full gap-6 flex flex-wrap justify-center">
        {stats.map((item, idx) => (
          <StatCard key={idx} {...item} />
        ))}
      </div>

      <div className="mt-10">
        <StudentStatsCard />
      </div>
      <div className="mt-10 hidden md:block">
        <AllUsersTable />
      </div>

      <div className="mt-10">
        <DashboardCards />
      </div>
    </div>
  );
}
