// src/services/doctorApi.js
// simple mock data and functions. Replace with real fetch/axios later.

const mockAppointments = [
  { id: "A1001", patientId: "P1001", patientName: "Suman Das", time: "10:15 AM", status: "Checked In", condition: "Fever" },
  { id: "A1002", patientId: "P1002", patientName: "Anika Routray", time: "11:00 AM", status: "Pending", condition: "Back Pain" },
];

const mockRecentPatients = [
  { patientId: "P1001", name: "Suman Das", lastVisit: "2025-07-28", condition: "Fever" },
  { patientId: "P1003", name: "Rohit Kumar", lastVisit: "2025-06-10", condition: "Diabetes follow-up" },
  { patientId: "P1002", name: "Anika Routray", lastVisit: "2025-05-12", condition: "Sprain" },
];

export const doctorApi = {
  login: async (payload) => {
    // fake auth - replace with backend call
    if ((payload.username === "pushpak" || payload.username === "jagat") && payload.password === "12345") {
      return { ok: true, doctor: { id: "D001", name: "Dr. Pushpak", dept: "General Medicine" } };
    }
    return { ok: false, message: "Invalid credentials" };
  },

  getTodayAppointments: async () => {
    // simulate network latency
    await new Promise(r => setTimeout(r, 250));
    return mockAppointments;
  },

  getRecentPatients: async () => {
    await new Promise(r => setTimeout(r, 250));
    return mockRecentPatients;
  },

  getPatientHistory: async (patientId) => {
    await new Promise(r => setTimeout(r, 200));
    // return demo record for given patientId
    return {
      patientId,
      name: mockRecentPatients.find(p => p.patientId === patientId)?.name || "Unknown",
      visits: [
        { date: "2025-07-28", reason: "Fever", notes: "Prescribed paracetamol" },
        { date: "2025-03-10", reason: "Cold", notes: "Advised rest" },
      ]
    };
  },

  savePrescription: async (presc) => {
    console.log("Saving prescription (mock):", presc);
    await new Promise(r => setTimeout(r, 200));
    return { ok: true, id: `RX${Math.floor(Math.random()*90000)+10000}` };
  }
};
