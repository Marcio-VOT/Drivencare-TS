import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import doctorRepositories from "../repositories/doctorRepositories.js";
dotenv.config();

async function create({ name, email, password, role, state, citie }) {
  const { rowCount } = await doctorRepositories.findByEmail(email);
  if (rowCount) throw new Error("User already exists");
  const hashedPassword = await bcrypt.hash(password, 10);

  await doctorRepositories.createDocData({
    role,
    state,
    citie,
  });

  await doctorRepositories.create({
    name,
    email,
    password: hashedPassword,
    role,
    state,
    citie,
  });
}

async function signin({ email, password }) {
  const {
    rowCount,
    rows: [user],
  } = await doctorRepositories.findByEmail(email);
  if (!rowCount) throw new Error("Incorrect email or password");

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) throw new Error("Incorrect email or password");

  const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
    expiresIn: "3h",
  });
  return token;
}

export default {
  create,
  signin,
};
