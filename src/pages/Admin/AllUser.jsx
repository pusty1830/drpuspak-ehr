import { useNavigate } from "react-router-dom";

export default function AllUsersTable() {
  const dummyUsers = [
    {
      id: 1,
      name: "Amitav Pusty",
      email: "amitav@example.com",
      role: "Student",
      status: "Active",
    },
    {
      id: 2,
      name: "John Doe",
      email: "john@example.com",
      role: "Teacher",
      status: "Active",
    },
    {
      id: 3,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Teacher",
      status: "Active",
    },
    {
      id: 4,
      name: "Michael Brown",
      email: "michael@example.com",
      role: "Student",
      status: "Active",
    },
  ];

  const statusClasses = {
    Active: "bg-green-100 text-green-800 border border-green-300",
    Inactive: "bg-red-100 text-red-700 border border-red-300",
  };

  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 w-full max-w-screen-xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
          All Users
        </h3>
        <button
          className="text-xs sm:text-sm px-3 py-1 cursor-pointer rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 transition"
          onClick={() => navigate("/admin/dashboard/user")}
        >
          View All
        </button>
      </div>

      {/* Table Container */}
      <div className="w-full overflow-x-auto">
        {/* Responsive inner container */}
        <div className="min-w-[600px] sm:min-w-full sm:max-w-full max-w-[300px]">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-3 font-semibold whitespace-nowrap">Name</th>
                <th className="px-4 py-3 font-semibold whitespace-nowrap">Email</th>
                <th className="px-4 py-3 font-semibold whitespace-nowrap">Role</th>
                <th className="px-4 py-3 font-semibold whitespace-nowrap">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {dummyUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition"
                >
                  <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap">{user.name}</td>
                  <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                    <span className="block max-w-[180px] truncate">{user.email}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{user.role}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
                        statusClasses[user.status] || "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
