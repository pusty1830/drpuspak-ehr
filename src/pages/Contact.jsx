import { useEffect, useState } from "react";
// replace with getAllMessages API if you have one
import { FiTrash2 } from "react-icons/fi";
import {
  deleteContactMessage,
  getAllContactMessages,
} from "../services/services";
import { toast } from "react-toastify";

export default function ContactMessagesTable() {
  const [messages, setMessages] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = () => {
    // update API call to your "getAllContactMessages"
    const payload = {
      data: { filter: "" },
      page: 0,
      pageSize: 100,
      order: [["createdAt", "DESC"]],
    };
    getAllContactMessages(payload).then((res) => {
      const data = res?.data?.data?.rows || [];
      setMessages(data);
    });
  };

  const handleDelete = (msg) => {
    setSelectedMessage(msg);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    console.log("Deleting message with id:", selectedMessage.id);
    deleteContactMessage(selectedMessage.id)
      .then((res) => {
        // Close modal immediately
        setShowDeleteModal(false);
        setMessages((prev) => prev.filter((m) => m.id !== selectedMessage.id));
        toast(res?.data?.msg);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 w-full max-w-screen-xl mx-auto mt-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
          Contact Messages
        </h3>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <div className="min-w-[700px] max-h-96 overflow-y-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-blue-600 text-white sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">Phone</th>
                <th className="px-4 py-3 font-semibold">Subject</th>
                <th className="px-4 py-3 font-semibold">Message</th>
                {/* <th className="px-4 py-3 font-semibold text-center">Action</th> */}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 bg-white">
              {messages.length > 0 ? (
                messages.map((msg) => (
                  <tr
                    key={msg.id}
                    className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition"
                  >
                    <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap">
                      {msg.name}
                    </td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                      {msg.email}
                    </td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                      {msg.phoneNumber}
                    </td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                      {msg.subject}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      <span className="block max-w-[250px] truncate">
                        {msg.message}
                      </span>
                    </td>
                    {/* <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => handleDelete(msg)}
                        className="p-1 rounded bg-red-100 text-red-700 hover:bg-red-200"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </td> */}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No messages found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Delete Message</h2>
            <p>Are you sure you want to delete this message?</p>

            <div className="flex justify-end gap-2 mt-4">
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
