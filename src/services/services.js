import { client } from "./axiosClient";

export function createUser(payLoad) {
  return client.post("/auth/signup", payLoad);
}

export function createpatientDetails(payLoad) {
  return client.post("/PatientDetails/create", payLoad);
}

export function createBooking(payLoad) {
  return client.post("/Booking/create", payLoad);
}

export function signIn(payLoad) {
  return client.post("/auth/signin", payLoad);
}

export function Reminder(payLoad) {
  return client.post("/Reminder/create", payLoad);
}

export function getReminderAccordingtoDate(payLoad) {
  return client.post("/Reminder/search-record", payLoad);
}

export function VoiceAgent(audioBlob) {
  const formData = new FormData();
  formData.append("audio", audioBlob);

  return client.post("/ask/transcribe", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export function getAllDoctor(payLoad) {
  return client.post("/User/search-record", payLoad);
}
export function getAllUser(payLoad) {
  return client.post("/User/search-record", payLoad);
}
export function getAllPatientDetails(payLoad) {
  return client.post("/PatientDetails/search-record", payLoad);
}

export function getDoctorDetails(payLoad) {
  return client.post("/DoctorDetails/search-record", payLoad);
}
export function getDoctorDetailswithuserId(userId) {
  return client.get("/DoctorDetails/search-one-record", { params: { userId } });
}

export function getUserDatawithId(id) {
  return client.get("/User/search-one-record", { params: { id } });
}

export function getUserDetailswithuserId(userId) {
  console.log("user id is :", userId);
  return client.get("/PatientDetails/search-one-record", {
    params: { userId: userId },
  });
}
export function verifyPayment(payload) {
  return client.post(`/pay/verify`, payload);
}

export function createOrder(payload) {
  return client.post(`/pay/orders`, payload);
}

export function createPayment(payload) {
  return client.post(`/Payment/create`, payload);
}

export function getAllPayment(payLoad) {
  return client.post(`/Payment/search-record`, payLoad);
}

export function getAllBooking(payLoad) {
  return client.post(`/Booking/search-record`, payLoad);
}

export function createPrescription(payLoad) {
  return client.post(`/Prescription/create`, payLoad);
}
export function getAllPrescription(payLoad) {
  return client.post(`/Prescription/search-record`, payLoad);
}

export function createReminder(payLoad) {
  return client.post(`/Reminder/create`, payLoad);
}

export function getAllContactMessages(payLoad) {
  return client.post(`/Contact/search-record`, payLoad);
}

export function deleteContactMessage(id) {
  return client.delete(`/Contact/delete-record/${id}`);
}
