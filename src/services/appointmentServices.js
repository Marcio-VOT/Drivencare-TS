import err from "../errors/index.js";
import appointmentRepositories from "../repositories/appointmentRepositories.js";

async function listAppointments({ id, type }) {
  if (type === "doctor")
    return await appointmentRepositories.listDoctorAppointments(id);
  else if (type === "patient")
    return await appointmentRepositories.listPatientAppointments(id);
  throw err.unauthorizedError();
}

export default {
  listAppointments,
};
