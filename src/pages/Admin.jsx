import StatCard from "./Admin/StatCard";
import {
  FaUserInjured, // for Patients
  FaUserPlus, // for Today's Patient
  FaCheckCircle, // for Completed
  FaRupeeSign, // for Payments (amount in ₹)
} from "react-icons/fa";
import StudentStatsCard from "./Admin/StudentStatCard";
import AllUsersTable from "./Admin/AllUser";
import DashboardCards from "./Admin/DashboardCard";
import { useEffect, useState } from "react";
import {
  getAllBooking,
  getAllPayment,
  getAllPrescription,
  getAllUser,
} from "../services/services";

export default function Dashboard() {
  const [booking, setBooking] = useState([]);
  const [weekPercentage, setWeekPercentage] = useState(0);
  const [weekIncrease, setWeekIncrease] = useState(false);

  const [todayCount, setTodayCount] = useState(0);
  const [todayPercentage, setTodayPercentage] = useState(0);
  const [todayIncrease, setTodayIncrease] = useState(false);

  // ✅ New state for completed prescriptions
  const [todayCompleted, setTodayCompleted] = useState(0);
  const [todayCompletedPct, setTodayCompletedPct] = useState(0);
  const [todayCompletedIncrease, setTodayCompletedIncrease] = useState(false);

  const [paymentCount, setPaymentCount] = useState(0);
  const [paymentPercentage, setPaymentPercentage] = useState(0);
  const [paymentIncrease, setPaymentIncrease] = useState(false);

  //usersc data
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const payload = {
      data: { filter: "" },
      page: 0,
      pageSize: 50,
      order: [["createdAt", "ASC"]],
    };

    getAllBooking(payload)
      .then((res) => {
        const rows = res?.data?.data?.rows || [];
        setBooking(rows);

        const now = new Date();

        /** ---------------- WEEKLY STATS ---------------- **/
        const dayOfWeek = now.getDay();
        const diffToMonday = (dayOfWeek + 6) % 7;
        const thisWeekStart = new Date(now);
        thisWeekStart.setHours(0, 0, 0, 0);
        thisWeekStart.setDate(now.getDate() - diffToMonday);

        const thisWeekEnd = new Date(thisWeekStart);
        thisWeekEnd.setDate(thisWeekStart.getDate() + 6);
        thisWeekEnd.setHours(23, 59, 59, 999);

        const lastWeekStart = new Date(thisWeekStart);
        lastWeekStart.setDate(thisWeekStart.getDate() - 7);

        const lastWeekEnd = new Date(thisWeekStart);
        lastWeekEnd.setDate(thisWeekStart.getDate() - 1);
        lastWeekEnd.setHours(23, 59, 59, 999);

        const thisWeekCount = rows.filter((b) => {
          const created = new Date(b.createdAt);
          return created >= thisWeekStart && created <= thisWeekEnd;
        }).length;

        const lastWeekCount = rows.filter((b) => {
          const created = new Date(b.createdAt);
          return created >= lastWeekStart && created <= lastWeekEnd;
        }).length;

        let weekPct = 0;
        if (lastWeekCount > 0) {
          weekPct = ((thisWeekCount - lastWeekCount) / lastWeekCount) * 100;
        } else if (thisWeekCount > 0) {
          weekPct = 100;
        }

        setWeekPercentage(Math.round(weekPct));
        setWeekIncrease(thisWeekCount >= lastWeekCount);

        /** ---------------- DAILY STATS ---------------- **/
        const todayStart = new Date(now);
        todayStart.setHours(0, 0, 0, 0);

        const todayEnd = new Date(now);
        todayEnd.setHours(23, 59, 59, 999);

        const yesterdayStart = new Date(todayStart);
        yesterdayStart.setDate(todayStart.getDate() - 1);

        const yesterdayEnd = new Date(todayStart);
        yesterdayEnd.setMilliseconds(-1);

        const todayBookings = rows.filter((b) => {
          const created = new Date(b.createdAt);
          return created >= todayStart && created <= todayEnd;
        }).length;

        const yesterdayBookings = rows.filter((b) => {
          const created = new Date(b.createdAt);
          return created >= yesterdayStart && created <= yesterdayEnd;
        }).length;

        let todayPct = 0;
        if (yesterdayBookings > 0) {
          todayPct =
            ((todayBookings - yesterdayBookings) / yesterdayBookings) * 100;
        } else if (todayBookings > 0) {
          todayPct = 100;
        }

        setTodayCount(todayBookings);
        setTodayPercentage(Math.round(todayPct));
        setTodayIncrease(todayBookings >= yesterdayBookings);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // ✅ Todays Completed Prescriptions
  useEffect(() => {
    const payload = {
      data: { filter: "" },
      page: 0,
      pageSize: 50,
      order: [["createdAt", "ASC"]],
    };

    getAllPrescription(payload)
      .then((res) => {
        const rows = res?.data?.data?.rows || [];
        const now = new Date();

        const todayStart = new Date(now);
        todayStart.setHours(0, 0, 0, 0);

        const todayEnd = new Date(now);
        todayEnd.setHours(23, 59, 59, 999);

        const yesterdayStart = new Date(todayStart);
        yesterdayStart.setDate(todayStart.getDate() - 1);

        const yesterdayEnd = new Date(todayStart);
        yesterdayEnd.setMilliseconds(-1);

        const todayPrescriptions = rows.filter((p) => {
          const created = new Date(p.createdAt);
          return created >= todayStart && created <= todayEnd;
        }).length;

        const yesterdayPrescriptions = rows.filter((p) => {
          const created = new Date(p.createdAt);
          return created >= yesterdayStart && created <= yesterdayEnd;
        }).length;

        let pct = 0;
        if (yesterdayPrescriptions > 0) {
          pct =
            ((todayPrescriptions - yesterdayPrescriptions) /
              yesterdayPrescriptions) *
            100;
        } else if (todayPrescriptions > 0) {
          pct = 100;
        }

        setTodayCompleted(todayPrescriptions);
        setTodayCompletedPct(Math.round(pct));
        setTodayCompletedIncrease(todayPrescriptions >= yesterdayPrescriptions);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Payment

  useEffect(() => {
    const payload = {
      data: { filter: "" },
      page: 0,
      pageSize: 100, // fetch enough records
      order: [["createdAt", "ASC"]],
    };

    getAllPayment(payload)
      .then((res) => {
        const rows = res?.data?.data?.rows || [];
        const now = new Date();

        /** ---------------- 30 DAYS STATS ---------------- **/
        const last30Start = new Date(now);
        last30Start.setDate(now.getDate() - 29);
        last30Start.setHours(0, 0, 0, 0);

        const last30End = new Date(now);
        last30End.setHours(23, 59, 59, 999);

        const prev30Start = new Date(last30Start);
        prev30Start.setDate(last30Start.getDate() - 30);

        const prev30End = new Date(last30Start);
        prev30End.setDate(last30Start.getDate() - 1);
        prev30End.setHours(23, 59, 59, 999);

        // ✅ SUM amounts instead of counting
        const last30Payments = rows
          .filter((p) => {
            const created = new Date(p.createdAt);
            return created >= last30Start && created <= last30End;
          })
          .reduce((sum, p) => sum + Number(p.ammount || 0), 0);

        const prev30Payments = rows
          .filter((p) => {
            const created = new Date(p.createdAt);
            return created >= prev30Start && created <= prev30End;
          })
          .reduce((sum, p) => sum + Number(p.ammount || 0), 0);

        let pct = 0;
        if (prev30Payments > 0) {
          pct = ((last30Payments - prev30Payments) / prev30Payments) * 100;
        } else if (last30Payments > 0) {
          pct = 100;
        }

        setPaymentCount(last30Payments); // ✅ total amount
        setPaymentPercentage(Math.round(pct));
        setPaymentIncrease(last30Payments >= prev30Payments);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // ✅ Stats array
  const stats = [
    {
      icon: <FaUserInjured className="text-white" />,
      label: "Total Patients",
      value: booking.length,
      percentage: weekPercentage,
      isIncrease: weekIncrease,
      chart: "rgba(79, 70, 229, 1)",
      days: 7,
    },
    {
      icon: <FaUserPlus className="text-white" />,
      label: "Today's Patient",
      value: todayCount,
      percentage: todayPercentage,
      isIncrease: todayIncrease,
      chart: "rgba(37, 99, 235, 1)",
      days: 1,
    },
    {
      icon: <FaCheckCircle className="text-white" />,
      label: "Today's Completed",
      value: todayCompleted,
      percentage: todayCompletedPct,
      isIncrease: todayCompletedIncrease,
      chart: "rgba(220, 38, 38, 1)",
      days: 1,
    },
    {
      icon: <FaRupeeSign className="text-white" />,
      label: "Payments (30 days)",
      value: `₹${paymentCount.toLocaleString()}`, // ✅ format amount with commas
      percentage: paymentPercentage,
      isIncrease: paymentIncrease,
      chart: "rgba(22, 163, 74, 1)",
      days: 30,
    },
  ];

  //All Users

  useEffect(() => {
    const payload = {
      data: { filter: "", role: "User" },
      page: 0,
      pageSize: 100, // fetch enough records
      order: [["createdAt", "ASC"]],
    };
    getAllUser(payload).then((res) => {
      const data = res?.data?.data?.rows || [];
      setUsers(data);
    });
  }, []);

  return (
    <div className="mx-auto p-4 w-full md:w-full mt-8">
      <h2 className="text-xl font-semibold mb-4">Admin Dashboard</h2>

      <div className=" w-full gap-6 flex flex-wrap justify-center">
        {stats.map((item, idx) => (
          <StatCard key={idx} {...item} />
        ))}
      </div>

      <div className="mt-10">
        <StudentStatsCard stats={stats} />
      </div>
      {/* ✅ Date Filter */}

      <div className="mt-10 hidden md:block">
        {/* ✅ Pass users as props */}
        <AllUsersTable users={users} />
      </div>
    </div>
  );
}
