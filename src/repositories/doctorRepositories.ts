import { QueryResult } from "pg";
import db from "../config/database.js";
import {
  AppointmentsList,
  Doctor,
  DoctorDataById,
  DoctorDataByName,
} from "../protocols/user.js";

async function findByEmail(
  email: string
): Promise<QueryResult<Doctor & DoctorDataById>> {
  return await db.query(
    `    
      SELECT * FROM doctors WHERE email=$1
    `,
    [email]
  );
}

async function create({
  name,
  email,
  password,
  role,
  state,
  city,
}: Omit<Doctor, "id"> & DoctorDataByName): Promise<void> {
  await db.query(
    `
INSERT INTO doctors (name, email, password, role_id, state_id, city_id)
VALUES ($1, $2, $3, (SELECT id FROM roles WHERE role = $4), (SELECT id FROM states WHERE state = $5), (SELECT id FROM cities WHERE city = $6));
      `,
    [name, email, password, role, state, city]
  );
}

async function createDocData({
  role,
  state,
  city,
}: DoctorDataByName): Promise<void> {
  await db.query(
    `
    WITH new_role AS (
        INSERT INTO roles (role)
        SELECT $1::varchar
        WHERE NOT EXISTS (SELECT 1 FROM roles WHERE role = $1::varchar)
        RETURNING id
      ),
      new_state AS (
        INSERT INTO states (state)
        SELECT $2::varchar
        WHERE NOT EXISTS (SELECT 1 FROM states WHERE state = $2::varchar)
        RETURNING id
      ),
      new_city AS (
        INSERT INTO cities (city)
        SELECT $3::varchar
        WHERE NOT EXISTS (SELECT 1 FROM cities WHERE city = $3::varchar)
        RETURNING id
      )
    SELECT NULL FROM new_role, new_state, new_city;
    
`,
    [role, state, city]
  );
}

async function listDoctors({
  role,
  state,
  city,
}: DoctorDataByName): Promise<
  QueryResult<Omit<Doctor, "email" | "password"> & DoctorDataByName>
> {
  return await db.query(
    `
    SELECT d.id, d.name, r.role, s.state, c.city
    FROM doctors d
    JOIN roles r ON d.role_id = r.id
    JOIN states s ON d.state_id = s.id
    JOIN cities c ON d.city_id = c.id
    WHERE d.role_id = (select id from roles where role = $1) 
    OR d.state_id = (select id from states where state = $2) 
    OR d.city_id = (select id from cities where city = $3);
  `,
    [role, state, city]
  );
}

async function findById(
  id: number
): Promise<QueryResult<Doctor & DoctorDataById>> {
  return await db.query(
    `
  SELECT * FROM doctors WHERE id = $1
  `,
    [id]
  );
}

async function listAppointments(
  id: number
): Promise<QueryResult<AppointmentsList>> {
  return await db.query(
    `
    SELECT app.id, app.date, p.name, r.role, app_s.status
    FROM appointments app
    JOIN doctors d ON d.id = app.doctor_id
    JOIN patients p ON p.id = app.patient_id
    JOIN appointment_status app_s ON app_s.id = app.status_id
    JOIN roles r ON r.id = d.role_id
    WHERE app.doctor_id = $1
    AND app.status_id <= 2;
  `,
    [id]
  );
}

export default {
  findByEmail,
  createDocData,
  create,
  listDoctors,
  findById,
  listAppointments,
};
