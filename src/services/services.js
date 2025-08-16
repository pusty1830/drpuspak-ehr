import { client } from "./axiosClient";

export function signIn(payLoad) {
  return client.post("/auth/signin", payLoad);
}

export function Reminder(payLoad) {
  return client.post("/Reminder/create", payLoad);
}

export function getReminderAccordingtoDate(payLoad) {
  return client.post("/Reminder/search-record", payLoad);
}
