import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import err from "../errors/index.js";
import patientRepositories from "../repositories/patientRepositories.js";
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

export default {
  create,
  signin,
  listAppointments,
};
