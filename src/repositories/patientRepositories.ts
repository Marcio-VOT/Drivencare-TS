import { QueryResult } from "pg";
import db from "../config/database.js";
import { AppointmentsList, Pacient } from "../protocols/user.js";

async function findByEmail(email: string): Promise<QueryResult<Pacient>> {
  return await db.query(
    `    
      SELECT * FROM patients WHERE email=$1
    `,
    [email]
  );
}

async function create({
  name,
  email,
  password,
}: Omit<Pacient, "id">): Promise<void> {
  await db.query(
    `
INSERT INTO patients (name, email, password)
VALUES ($1, $2, $3);
      `,
    [name, email, password]
  );
}

async function findById(id: number): Promise<QueryResult<Pacient>> {
  return await db.query(
    `
  SELECT * FROM patients WHERE id = $1
  `,
    [id]
  );
}

async function listAppointments(
  id: number
): Promise<QueryResult<AppointmentsList>> {
  return await db.query(
    `
    SELECT app.id, app.date, d.name, r.role, app_s.status
    FROM appointments app
    JOIN doctors d ON d.id = app.doctor_id
    JOIN patients p ON p.id = app.patient_id
    JOIN appointment_status app_s ON app_s.id = app.status_id
    JOIN roles r ON r.id = d.role_id
    WHERE app.patient_id = $1
    AND app.status_id <= 3;
  `,
    [id]
  );
}

export default {
  findByEmail,
  create,
  findById,
  listAppointments,
};
