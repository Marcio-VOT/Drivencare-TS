import db from "../config/database.js";

async function listDoctorAppointments(id) {
  return db.query(
    `
      SELECT app.id, app.date, p.name AS patient, d.name AS doctor, r.role, app_s.status
      FROM appointments app
      JOIN doctors d ON d.id = app.doctor_id
      JOIN patients p ON p.id = app.patient_id
      JOIN appointment_status app_s ON app_s.id = app.status_id
      JOIN roles r ON r.id = d.role_id
      WHERE app.doctor_id = $1
      ;
    `,
    [id]
  );
}

async function listPatientAppointments(id) {
  return db.query(
    `
        SELECT app.id, app.date, p.name AS patient , d.name AS doctor, r.role, app_s.status
        FROM appointments app
        JOIN doctors d ON d.id = app.doctor_id
        JOIN patients p ON p.id = app.patient_id
        JOIN appointment_status app_s ON app_s.id = app.status_id
        JOIN roles r ON r.id = d.role_id
        WHERE app.patient_id = $1
        ;
      `,
    [id]
  );
}

export default {
  listDoctorAppointments,
  listPatientAppointments,
};
