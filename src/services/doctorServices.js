import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import doctorRepositories from "../repositories/doctorRepositories.js";
import err from "../errors/index.js";
dotenv.config();

async function create({ name, email, password, role, state, city }) {
  const { rowCount } = await doctorRepositories.findByEmail(email);
  if (rowCount) throw err.duplicatedEmailError(email);

  const hashedPassword = await bcrypt.hash(password, 10);

  await doctorRepositories.createDocData({
    role,
    state,
    city,
  });
  await doctorRepositories.create({
    name,
    email,
    password: hashedPassword,
    role,
    state,
    city,
  });
}

async function signin({ email, password }) {
  const {
    rowCount,
    rows: [user],
  } = await doctorRepositories.findByEmail(email);
  if (!rowCount) throw err.invalidCredentialsError();

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) throw err.invalidCredentialsError();

  const token = jwt.sign(
    { userId: user.id, type: "doctor" },
    process.env.SECRET_KEY,
    {
      expiresIn: "3h",
    }
  );
  return token;
}

async function listDoctors({ role, state, city }) {
  return await doctorRepositories.listDoctors({ role, state, city });
}

async function listAppointments({ id, type }) {
  if (type !== "doctor") throw err.wrongAuthorizedUserError(type);
  return await doctorRepositories.listAppointments(id);
}

export default {
  create,
  signin,
  listDoctors,
  listAppointments,
};
