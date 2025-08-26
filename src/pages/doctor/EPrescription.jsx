// src/pages/doctor/EPrescription.jsx
import React, { useEffect, useState } from "react";
import {
  FaPlus,
  FaTrash,
  FaSave,
  FaFilePdf,
  FaChevronDown,
} from "react-icons/fa";
import { getUserId } from "../../services/axiosClient";
import {
  createPrescription,
  createReminder,
  getUserDatawithId,
  getUserDetailswithuserId,
} from "../../services/services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const defaultMedicine = () => ({
  id: Date.now().toString(),
  name: "",
  dose: "",
  freq: "",
  days: "",
});

const NEXT_VISIT_OPTIONS = [
  "7 days",
  "15 days",
  "21 days",
  "1 month",
  "2 months",
  "3 months",
  "4 months",
  "5 months",
  "6 months",
  "7 months",
  "8 months",
  "9 months",
  "10 months",
  "11 months",
  "12 months",
];

// Medical advice options for the dropdown
const ADVICE_OPTIONS = [
  "CT Scan",
  "MRI",
  "X-Ray",
  "Ultrasound",
  "Blood Test",
  "Urine Test",
  "ECG",
  "EEG",
  "Endoscopy",
  "Colonoscopy",
  "Biopsy",
  "Physical Therapy",
  "Follow-up in 1 week",
  "Follow-up in 2 weeks",
  "Other",
];

const EPrescription = ({ patient, onClose, onSave }) => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    patientId: patient.patientId || "",
    name: patient.name || "",
    condition: patient.condition ?? "",
    medicines: [defaultMedicine()],
    notes: "",
    nextVisit: "",
    advice: [],
  });

  const [customAdvice, setCustomAdvice] = useState("");
  const [showAdviceDropdown, setShowAdviceDropdown] = useState(false);

  useEffect(() => {
    // fetch patient history (mock)
    (async () => {
      // const h = await doctorApi.getPatientHistory(data.patientId);
      // setHistory(h);
    })();
  }, []);

  const updateMedicine = (id, key, value) => {
    setData((prev) => ({
      ...prev,
      medicines: prev.medicines.map((m) =>
        m.id === id ? { ...m, [key]: value } : m
      ),
    }));
  };

  const addMedicine = () => {
    setData((prev) => ({
      ...prev,
      medicines: [...prev.medicines, defaultMedicine()],
    }));
  };

  const removeMedicine = (id) => {
    setData((prev) => ({
      ...prev,
      medicines: prev.medicines.filter((m) => m.id !== id),
    }));
  };

  const buildReminderPayload = async (patientId, nextVisitText, condition) => {
    try {
      // Fetch patient info
      const patientRes = await getUserDatawithId(patientId);
      const patient = patientRes?.data?.data || {};

      // Fetch user info
      const userRes = await getUserDetailswithuserId(patientId);
      const user = userRes?.data?.data || {};

      // Helper to convert nextVisit text to actual date
      const convertNextVisitToDate = (text) => {
        const today = new Date();
        if (!text) return today.toISOString().split("T")[0];
        if (text.includes("day"))
          today.setDate(today.getDate() + parseInt(text));
        else if (text.includes("month"))
          today.setMonth(today.getMonth() + parseInt(text));
        return today.toISOString().split("T")[0];
      };

      console.log(user);
      console.log(patient);
      // Build payload directly
      const reminderaPayLoad = {
        patientNumber: patient.phoneNumber || "",
        patientName: patient.userName || "",
        Age: user.age || "",
        address: user.adress || "",
        disease: condition || "",
        fromWhere: "clinic",
        nextVisit: convertNextVisitToDate(nextVisitText),
      };

      return reminderaPayLoad;
    } catch (err) {
      console.error("Error building reminder payload:", err);
      return null;
    }
  };

  const handleAdviceSelect = (advice) => {
    if (advice === "Other") {
      if (customAdvice.trim() && !data.advice.includes(customAdvice)) {
        setData((prev) => ({
          ...prev,
          advice: [...prev.advice, customAdvice],
        }));
        setCustomAdvice("");
      }
      return;
    }

    if (!data.advice.includes(advice)) {
      setData((prev) => ({ ...prev, advice: [...prev.advice, advice] }));
    }
    setShowAdviceDropdown(false);
  };

  const removeAdvice = (index) => {
    setData((prev) => ({
      ...prev,
      advice: prev.advice.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async () => {
    // Build payload with drug JSON
    const payLoad = {
      userId: data.patientId,
      condition: data.condition,
      doctorId: getUserId(),
      drug: data.medicines.map((m) => ({
        name: m.name,
        dose: m.dose,
        freq: m.freq,
        days: m.days,
      })),
      messages: data.notes,
      advices: data.advice,
      nextVisit: data.nextVisit,
    };

    const reminderPayload = await buildReminderPayload(
      data.patientId,
      data.nextVisit,
      data.condition
    );
    if (reminderPayload) {
      createReminder(reminderPayload)
        .then((res) => {
          toast("Reminder Added Successfully");
        })
        .catch((err) => {
          console.log(err);
        });
    }

    createPrescription(payLoad)
      .then((res) => {
        // Call parent save handler
        onSave(payLoad);
        toast.success("Prescription Saved Successfully");

        // Navigate to Prescription page with data
        navigate("/prescription", { state: { prescription: payLoad } });

        onClose();
      })
      .catch((error) => {
        toast.error("Error saving prescription: " + error.message);
      });
  };

  return (
    // full-screen modal overlay
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-xl w-full md:w-3/4 max-h-[90vh] overflow-auto shadow-lg p-6">
        <div className="flex justify-between items-start mb-6 pb-4 border-b">
          <div>
            <h3 className="text-2xl font-bold text-blue-600">E-Prescription</h3>
            <p className="text-sm text-gray-500 mt-1">
              Patient ID: {data.patientId} · {data.name}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <FaSave /> Save & Print
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>

        {/* Condition & Next Visit */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Condition
            </label>
            <input
              value={data.condition}
              onChange={(e) => setData({ ...data, condition: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. Hypertension, Diabetes"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Next Visit
            </label>
            <select
              value={data.nextVisit}
              onChange={(e) => setData({ ...data, nextVisit: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select next visit</option>
              {NEXT_VISIT_OPTIONS.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Medicines list */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-lg text-gray-800">Medications</h4>
            <button
              onClick={addMedicine}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <FaPlus /> Add Medicine
            </button>
          </div>

          <div className="space-y-4">
            {data.medicines.map((m) => (
              <div
                key={m.id}
                className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center border border-gray-200 rounded-lg p-4 bg-gray-50/50"
              >
                <input
                  className="md:col-span-4 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Medicine name"
                  value={m.name}
                  onChange={(e) => updateMedicine(m.id, "name", e.target.value)}
                />
                <input
                  className="md:col-span-2 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Dose (e.g. 500mg)"
                  value={m.dose}
                  onChange={(e) => updateMedicine(m.id, "dose", e.target.value)}
                />
                <input
                  className="md:col-span-2 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Frequency (e.g. 2x/day)"
                  value={m.freq}
                  onChange={(e) => updateMedicine(m.id, "freq", e.target.value)}
                />
                <input
                  className="md:col-span-2 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Days"
                  type="number"
                  min="1"
                  value={m.days}
                  onChange={(e) => updateMedicine(m.id, "days", e.target.value)}
                />
                <button
                  className="md:col-span-2 bg-red-100 text-red-600 p-2 rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center"
                  onClick={() => removeMedicine(m.id)}
                  title="Remove medicine"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Advice Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-lg text-gray-800">
              Medical Advice
            </h4>
          </div>

          <div className="relative mb-3">
            <button
              onClick={() => setShowAdviceDropdown(!showAdviceDropdown)}
              className="w-full flex items-center justify-between border border-gray-300 rounded-lg p-3 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <span>Select medical advice</span>
              <FaChevronDown
                className={`transition-transform ${
                  showAdviceDropdown ? "rotate-180" : ""
                }`}
              />
            </button>

            {showAdviceDropdown && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                {ADVICE_OPTIONS.map((option, index) => (
                  <div
                    key={index}
                    onClick={() => handleAdviceSelect(option)}
                    className="p-3 hover:bg-blue-50 cursor-pointer"
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Custom advice input for "Other" option */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-3">
            <input
              className="md:col-span-10 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter custom advice"
              value={customAdvice}
              onChange={(e) => setCustomAdvice(e.target.value)}
            />
            <button
              onClick={() => handleAdviceSelect("Other")}
              className="md:col-span-2 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Custom
            </button>
          </div>

          {/* Selected advice items */}
          <div className="flex flex-wrap gap-2">
            {data.advice.map((item, index) => (
              <div
                key={index}
                className="bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm flex items-center"
              >
                {item}
                <button
                  onClick={() => removeAdvice(index)}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Additional Notes
          </label>
          <textarea
            value={data.notes}
            onChange={(e) => setData({ ...data, notes: e.target.value })}
            className="w-full border border-gray-300 rounded-lg p-3 h-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Examination findings, instructions, precautions..."
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
          >
            <FaFilePdf /> Save & Generate PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default EPrescription;
