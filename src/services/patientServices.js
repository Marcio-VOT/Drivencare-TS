import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import err from "../errors/index.js";
import patientRepositories from "../repositories/patientRepositories.js";
import appointmentRepositories from "../repositories/appointmentRepositories.js";
import doctorRepositories from "../repositories/doctorRepositories.js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
dayjs.extend(utc);
dotenv.config();

async function create({ name, email, password }) {
  const { rowCount } = await patientRepositories.findByEmail(email);
  if (rowCount) throw err.duplicatedEmailError(email);

  const hashedPassword = await bcrypt.hash(password, 10);

  await patientRepositories.create({
    name,
    email,
    password: hashedPassword,
  });
}

async function signin({ email, password }) {
  const {
    rowCount,
    rows: [user],
  } = await patientRepositories.findByEmail(email);
  if (!rowCount) throw err.invalidCredentialsError();

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) throw err.invalidCredentialsError();

  const token = jwt.sign(
    { userId: user.id, type: "patient" },
    process.env.SECRET_KEY,
    {
      expiresIn: "3h",
    }
  );
  return token;
}

async function listAppointments({ id, type }) {
  if (type !== "patient") throw err.wrongAuthorizedUserError(type);
  return await patientRepositories.listAppointments(id);
}

async function createAppointment({ date, doctorId, type, userId }) {
  if (type !== "patient") throw err.wrongAuthorizedUserError(type);

  const { rowCount: doctorCount } = await doctorRepositories.findById(doctorId);
  if (!doctorCount) throw err.conflictError("No doctor found");

  if (date < new Date().toISOString()) throw err.conflictError("Invalid Date");
  else date = dayjs(date).utc().format("DD/MM/YYYY HH:");

  const { rowCount: appCount } =
    await appointmentRepositories.findDoctorAppointment({
      id: doctorId,
      date,
    });
  if (appCount) throw err.conflictError("Date unavailable");

  await appointmentRepositories.createAppointment({
    userId,
    doctorId,
    date,
  });
}

export default {
  create,
  signin,
  listAppointments,
  createAppointment,
};
