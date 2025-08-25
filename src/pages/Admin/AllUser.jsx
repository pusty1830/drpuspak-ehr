import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AllUsersTable({ users = [] }) {
  const [filterDate, setFilterDate] = useState("");

 
  const navigate = useNavigate();

  // ✅ filter by createdAt date
  const filteredUsers = filterDate
    ? users.filter((user) => {
        const userDate = new Date(user.createdAt).toISOString().split("T")[0];
        return userDate === filterDate;
      })
    : users;

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 w-full max-w-screen-xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
          All Users
        </h3>

        <div className="flex items-center gap-2">
          {/* ✅ Date filter input */}
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

          <button
            className="text-xs sm:text-sm px-3 py-1 cursor-pointer rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 transition"
            onClick={() => navigate("/admin/dashboard/user")}
          >
            View All
          </button>
        </div>
      </div>

      {/* ✅ Single Table with Sticky Header */}
      <div className="w-full overflow-x-auto">
        <div className="min-w-[600px] max-h-80 overflow-y-auto">
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
                  Email
                </th>
                <th className="px-4 py-3 font-semibold whitespace-nowrap">
                  Role
                </th>
                <th className="px-4 py-3 font-semibold whitespace-nowrap">
                  Created At
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
                      {user.userName}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap">
                      {user.phoneNumber}
                    </td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                      <span className="block max-w-[180px] truncate">
                        {user.email}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                      {user.role}
                    </td>
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
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
