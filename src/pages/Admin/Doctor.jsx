import { useEffect, useState } from "react";
import { getAllUser } from "../../services/services";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function DoctorTable() {
  const [users, setUsers] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // for edit or delete

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = () => {
    const payload = {
      data: { filter: "", role: "Doctor" },
      page: 0,
      pageSize: 100,
      order: [["createdAt", "ASC"]],
    };
    getAllUser(payload).then((res) => {
      const data = res?.data?.data?.rows || [];
      setUsers(data);
    });
  };

  // ✅ filter by createdAt date
  const filteredUsers = filterDate
    ? users.filter((user) => {
        const userDate = new Date(user.createdAt).toISOString().split("T")[0];
        return userDate === filterDate;
      })
    : users;

  // ✅ Handlers
  const handleAdd = () => {
    setSelectedUser(null);
    setShowAddEditModal(true);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowAddEditModal(true);
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    // ✅ DELETE API
    console.log("Deleting doctor with id:", selectedUser.id);
    setUsers((prev) => prev.filter((u) => u.id !== selectedUser.id));
    setShowDeleteModal(false);
  };

  // ✅ Yup Validation Schema
  const DoctorSchema = Yup.object().shape({
    userName: Yup.string().required("Name is required"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 w-full max-w-screen-xl mx-auto mt-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
          All Doctors
        </h3>

        <div className="flex items-center gap-2">
          {/* Date filter */}
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

          {/* Add Doctor */}
          <button
            onClick={handleAdd}
            className="flex items-center gap-1 text-xs sm:text-sm px-3 py-1 rounded-full bg-green-50 text-green-700 hover:bg-green-100 transition"
          >
            <FiPlus className="w-4 h-4" /> Add Doctor
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <div className="min-w-[700px] max-h-80 overflow-y-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-blue-600 text-white sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Phone No</th>
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">Role</th>
                <th className="px-4 py-3 font-semibold">Created At</th>
                <th className="px-4 py-3 font-semibold text-center">Actions</th>
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
                    <td className="px-4 py-3 text-center flex gap-2 justify-center">
                      <button
                        onClick={() => handleEdit(user)}
                        className="p-1 rounded bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                      >
                        <FiEdit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(user)}
                        className="p-1 rounded bg-red-100 text-red-700 hover:bg-red-200"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No doctors found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showAddEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-lg font-semibold mb-4">
              {selectedUser ? "Edit Doctor" : "Add Doctor"}
            </h2>

            <Formik
              initialValues={{
                userName: selectedUser?.userName || "",
                phoneNumber: selectedUser?.phoneNumber || "",
                email: selectedUser?.email || "",
                role: "Doctor",
              }}
              validationSchema={DoctorSchema}
              onSubmit={(values) => {
                if (selectedUser) {
                  // ✅ EDIT API
                  console.log("Updating doctor:", {
                    id: selectedUser.id,
                    ...values,
                  });
                  setUsers((prev) =>
                    prev.map((u) =>
                      u.id === selectedUser.id ? { ...u, ...values } : u
                    )
                  );
                } else {
                  // ✅ ADD API
                  console.log("Adding doctor:", values);
                  const newUser = {
                    id: Date.now(),
                    ...values,
                    createdAt: new Date(),
                  };
                  setUsers((prev) => [newUser, ...prev]);
                }
                setShowAddEditModal(false);
              }}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-3">
                  <div>
                    <Field
                      name="userName"
                      type="text"
                      placeholder="Name"
                      className="w-full border px-3 py-2 rounded"
                    />
                    <ErrorMessage
                      name="userName"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div>
                    <Field
                      name="phoneNumber"
                      type="text"
                      placeholder="Phone Number"
                      className="w-full border px-3 py-2 rounded"
                    />
                    <ErrorMessage
                      name="phoneNumber"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div>
                    <Field
                      name="email"
                      type="email"
                      placeholder="Email"
                      className="w-full border px-3 py-2 rounded"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      type="button"
                      onClick={() => setShowAddEditModal(false)}
                      className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                    >
                      {isSubmitting ? "Saving..." : "Save"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg text-center">
            <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete{" "}
              <span className="font-medium">{selectedUser?.userName}</span>?
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
