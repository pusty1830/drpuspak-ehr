import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getReminderAccordingtoDate } from "../../services/services";

export default function ReminderTable() {
  const [users, setUsers] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const payload = {
      data: { filter: "" },
      page: 0,
      pageSize: 100,
      order: [["createdAt", "ASC"]],
    };
    getReminderAccordingtoDate(payload)
      .then((res) => {
        setUsers(res?.data?.data?.rows || []);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []); // ✅ only fetch once

  // ✅ filter by nextVisit date
  const filteredUsers = filterDate
    ? users.filter((user) => {
        if (!user.nextVisit) return false;
        const userDate = new Date(user.nextVisit).toISOString().split("T")[0];
        return userDate === filterDate;
      })
    : users;

  // ✅ Export to CSV function
  const exportToCSV = () => {
    if (filteredUsers.length === 0) {
      alert("No data to export!");
      return;
    }

    const headers = [
      "Name",
      "Phone No",
      "Age",
      "Address",
      "Disease",
      "Where",
      "Next Visit",
    ];
    const rows = filteredUsers.map((user) => [
      user.patientName,
      user.patientNumber,
      user.Age,
      user.address,
      user.disease,
      user.fromWhere,
      new Date(user.nextVisit).toLocaleDateString(),
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "reminder_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 w-full max-w-screen-xl mx-auto mt-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
          All Users
        </h3>

        <div className="flex items-center gap-2">
          {/* ✅ Date filter input (Next Visit) */}
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="border px-3 py-1 rounded text-sm"
          />
          {filterDate && (
            <button
              onClick={() => setFilterDate("")}
              className="px-3 py-1 text-xs rounded bg-gray-200 hover:bg-gray-300"
            >
              Reset
            </button>
          )}

          {/* ✅ Export button */}
          <button
            onClick={exportToCSV}
            className="text-xs sm:text-sm px-3 py-1 cursor-pointer rounded-full bg-green-50 text-green-700 hover:bg-green-100 transition"
          >
            Export
          </button>

          <button
            className="text-xs sm:text-sm px-3 py-1 cursor-pointer rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 transition"
            onClick={() => setFilterDate("")}
          >
            View All
          </button>
        </div>
      </div>

      {/* ✅ Table with Fixed Height & Sticky Header */}
      <div className="w-full overflow-x-auto">
        <div className="min-w-[600px] h-80 overflow-y-auto border rounded-lg">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-blue-600 text-white sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3 font-semibold whitespace-nowrap">
                  Name
                </th>
                <th className="px-4 py-3 font-semibold whitespace-nowrap">
                  Phone No
                </th>
                <th className="px-4 py-3 font-semibold whitespace-nowrap">
                  Age
                </th>
                <th className="px-4 py-3 font-semibold whitespace-nowrap">
                  Address
                </th>
                <th className="px-4 py-3 font-semibold whitespace-nowrap">
                  Disease
                </th>
                <th className="px-4 py-3 font-semibold whitespace-nowrap">
                  Where
                </th>
                <th className="px-4 py-3 font-semibold whitespace-nowrap">
                  Next Visit
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 bg-white">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition"
                  >
                    <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap">
                      {user.patientName}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap">
                      {user.patientNumber}
                    </td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                      {user.Age}
                    </td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                      {user.address}
                    </td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                      {user.disease}
                    </td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                      {user.fromWhere}
                    </td>
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                      {user.nextVisit
                        ? new Date(user.nextVisit).toLocaleDateString()
                        : "-"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
