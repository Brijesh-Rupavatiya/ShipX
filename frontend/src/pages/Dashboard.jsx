import React, { useState, useEffect } from "react";
import { contactAPI } from "../services/api";
import {
  PencilIcon,
  TrashIcon,
  EyeIcon,
  PaperClipIcon,
} from "@heroicons/react/24/outline";

const Dashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("view");
  const [selectedContact, setSelectedContact] = useState(null);
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    business_name: "",
    message: "",
  });
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async (page = 1) => {
    try {
      setLoading(true);
      const response = await contactAPI.getAll(page);
      setContacts(response.data.data);
      setPagination(response.data.meta || {});
    } catch (error) {
      showNotification("error", "Failed to fetch contacts");
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleEdit = (contact) => {
    setSelectedContact(contact);
    setFormData({
      name: contact.name,
      email: contact.email,
      phone: contact.phone || "",
      business_name: contact.business_name || "",
      message: contact.message,
    });
    setModalMode("edit");
    setShowModal(true);
  };

  const handleCreate = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      business_name: "",
      message: "",
    });
    setFile(null);
    setModalMode("create");
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    if (file) data.append("file", file);

    try {
      if (modalMode === "create") {
        await contactAPI.create(data);
        showNotification("success", "Contact created");
      } else {
        // For Laravel PUT with files, use _method spoofing
        data.append("_method", "PUT");
        await contactAPI.update(selectedContact.id, data);
        showNotification("success", "Contact updated");
      }
      setShowModal(false);
      fetchContacts();
    } catch (error) {
      showNotification("error", "Action failed. Check fields.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {notification && (
        <div
          className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg text-white ${
            notification.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {notification.message}
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              ShipX Dashboard
            </h1>
            <p className="text-gray-500 mt-2">
              Manage customer inquiries and uploads.
            </p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleCreate}
              className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition"
            >
              + New Lead
            </button>
            <a
              href="/"
              className="bg-white border border-gray-200 text-gray-700 px-6 py-2.5 rounded-xl font-bold hover:bg-gray-50 transition"
            >
              View Site
            </a>
          </div>
        </div>

        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">
                  ID
                </th>
                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Client Details
                </th>
                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Business
                </th>
                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">
                  File
                </th>
                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {contacts.map((contact) => (
                <tr
                  key={contact.id}
                  className="hover:bg-indigo-50/30 transition"
                >
                  <td className="px-8 py-6 text-sm text-gray-500">
                    #{contact.id}
                  </td>
                  <td className="px-8 py-6">
                    <div className="font-bold text-gray-900">
                      {contact.name}
                    </div>
                    <div className="text-xs text-gray-500">{contact.email}</div>
                  </td>
                  <td className="px-8 py-6 text-sm text-gray-700 font-medium">
                    {contact.business_name || "N/A"}
                  </td>
                  <td className="px-8 py-6">
                    {contact.file_url ? (
                      <a
                        href={contact.file_url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 text-indigo-600 hover:underline"
                      >
                        <PaperClipIcon className="w-4 h-4" />{" "}
                        <span className="text-xs font-bold">View</span>
                      </a>
                    ) : (
                      <span className="text-gray-300 text-xs">No file</span>
                    )}
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setSelectedContact(contact);
                          setModalMode("view");
                          setShowModal(true);
                        }}
                        className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"
                      >
                        <EyeIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleEdit(contact)}
                        className="p-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={async () => {
                          if (window.confirm("Delete?")) {
                            await contactAPI.delete(contact.id);
                            fetchContacts();
                          }
                        }}
                        className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900 capitalize">
                {modalMode} Contact
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-8">
              {modalMode === "view" ? (
                <div className="space-y-6">
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase">
                      Message
                    </label>
                    <p className="text-gray-700 mt-1">
                      {selectedContact.message}
                    </p>
                  </div>
                  {selectedContact.file_url && (
                    <a
                      href={selectedContact.file_url}
                      className="inline-block bg-gray-100 px-4 py-2 rounded-lg text-sm font-bold"
                    >
                      Download Attachment
                    </a>
                  )}
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full border border-gray-200 rounded-xl px-4 py-3"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full border border-gray-200 rounded-xl px-4 py-3"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Business Name"
                    value={formData.business_name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        business_name: e.target.value,
                      })
                    }
                    className="w-full border border-gray-200 rounded-xl px-4 py-3"
                  />
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="text-sm block w-full"
                  />
                  <textarea
                    placeholder="Message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full border border-gray-200 rounded-xl px-4 py-3"
                    rows="3"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-700 transition"
                  >
                    Save Changes
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
