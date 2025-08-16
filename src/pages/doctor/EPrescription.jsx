// src/pages/doctor/EPrescription.jsx
import React, { useEffect, useState } from "react";
import { FaPlus, FaTrash, FaSave } from "react-icons/fa";

const defaultMedicine = () => ({
  id: Date.now().toString(),
  name: "",
  dose: "",
  freq: "",
  days: "",
});

const EPrescription = ({ patient, onClose, onSave }) => {
  const [data, setData] = useState({
    patientId: patient.patientId || "",
    name: patient.name || "",
    condition: patient.condition || "",
    medicines: [defaultMedicine()],
    notes: "",
    nextVisit: "",
  });
  const [history, setHistory] = useState(null);

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

  const handleSave = async () => {
    // Basic validation
    if (!data.name || !data.patientId) {
      alert("Patient name and ID required.");
      return;
    }
    const res = await onSave(data);
    // onSave handles closing on success
  };

  return (
    // full-screen modal overlay
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-xl w-full md:w-3/4 max-h-[90vh] overflow-auto shadow-lg p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold">E-Prescription</h3>
            <p className="text-sm text-gray-500">
              Patient ID: {data.patientId} · {data.name}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-green-600 text-white px-3 py-2 rounded"
            >
              <FaSave /> Save
            </button>
            <button onClick={onClose} className="px-3 py-2 bg-gray-100 rounded">
              Close
            </button>
          </div>
        </div>

        {/* Patient History (optional summary) */}
        {history && (
          <div className="mt-4 p-3 bg-gray-50 rounded text-sm text-gray-700">
            <p className="font-medium">Recent visits:</p>
            {history.visits.map((v, i) => (
              <div key={i} className="mt-2">
                <div className="text-xs text-gray-500">{v.date}</div>
                <div className="text-sm">
                  {v.reason} — <span className="text-gray-600">{v.notes}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Condition & Notes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="text-sm font-medium">Condition</label>
            <input
              value={data.condition}
              onChange={(e) => setData({ ...data, condition: e.target.value })}
              className="w-full border rounded p-2 mt-1"
              placeholder="e.g. Fever"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Next Visit</label>
            <input
              value={data.nextVisit}
              onChange={(e) => setData({ ...data, nextVisit: e.target.value })}
              type="date"
              className="w-full border rounded p-2 mt-1"
            />
          </div>
        </div>

        {/* Medicines list */}
        <div className="mt-5">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Medicines</h4>
            <button
              onClick={addMedicine}
              className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded"
            >
              <FaPlus /> Add
            </button>
          </div>

          <div className="mt-3 space-y-3">
            {data.medicines.map((m) => (
              <div
                key={m.id}
                className="grid grid-cols-1 md:grid-cols-6 gap-2 items-center border rounded p-3"
              >
                <input
                  className="md:col-span-2 border rounded p-2"
                  placeholder="Medicine name"
                  value={m.name}
                  onChange={(e) => updateMedicine(m.id, "name", e.target.value)}
                />
                <input
                  className="md:col-span-1 border rounded p-2"
                  placeholder="Dose (e.g. 500mg)"
                  value={m.dose}
                  onChange={(e) => updateMedicine(m.id, "dose", e.target.value)}
                />
                <input
                  className="md:col-span-1 border rounded p-2"
                  placeholder="Freq (e.g. 2x/day)"
                  value={m.freq}
                  onChange={(e) => updateMedicine(m.id, "freq", e.target.value)}
                />
                <input
                  className="md:col-span-1 border rounded p-2"
                  placeholder="Days"
                  value={m.days}
                  onChange={(e) => updateMedicine(m.id, "days", e.target.value)}
                />
                <button
                  className="md:col-span-1 bg-red-100 text-red-600 p-2 rounded"
                  onClick={() => removeMedicine(m.id)}
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="mt-5">
          <label className="text-sm font-medium">Notes</label>
          <textarea
            value={data.notes}
            onChange={(e) => setData({ ...data, notes: e.target.value })}
            className="w-full border rounded p-2 mt-1 h-24"
            placeholder="Examination notes, instructions..."
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded border">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded bg-blue-600 text-white"
          >
            Save Prescription
          </button>
        </div>
      </div>
    </div>
  );
};

export default EPrescription;
