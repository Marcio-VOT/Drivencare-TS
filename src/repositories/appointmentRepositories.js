import db from "../config/database.js";

async function listDoctorAppointments(id) {
  return await db.query(
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

async function findDoctorAppointment({ id, date }) {
  return await db.query(
    `
      SELECT app.id, app.date, p.name AS patient, d.name AS doctor, r.role, app_s.status
      FROM appointments app
      JOIN doctors d ON d.id = app.doctor_id
      JOIN patients p ON p.id = app.patient_id
      JOIN appointment_status app_s ON app_s.id = app.status_id
      JOIN roles r ON r.id = d.role_id
      WHERE app.doctor_id = $1
      AND app.date = $2
      ;
    `,
    [id, date]
  );
}

async function listPatientAppointments(id) {
  return await db.query(
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

async function createAppointment({ userId, doctorId, date }) {
  return await db.query(
    `
    INSERT INTO appointments (patient_id, doctor_id, date, status_id)
    VALUES ($1, $2 , $3 , (SELECT id FROM appointment_status WHERE status = 'pending'))
  `,
    [userId, doctorId, date]
  );
}

async function findAppointment({ id, doctorId }) {
  return await db.query(
    `
    SELECT * FROM appointments WHERE id = $1 AND doctor_id = $2
  `,
    [id, doctorId]
  );
}

async function aupdateAppointment({ id, doctorId, status }) {
  await db.query(
    `
  UPDATE appointments 
  SET status_id = 
  (SELECT id FROM appointment_status WHERE status = $3)
  WHERE id = $1
  AND docotor_id = $2;
  `,
    [id, doctorId, status]
  );
}

export default {
  listDoctorAppointments,
  listPatientAppointments,
  findDoctorAppointment,
  createAppointment,
  findAppointment,
  aupdateAppointment,
};
