import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import err from "../errors/index.js";
import pacientRepositories from "../repositories/pacientRepositories.js";
dotenv.config();

async function create({ name, email, password }) {
  const { rowCount } = await pacientRepositories.findByEmail(email);
  if (rowCount) throw err.duplicatedEmailError(email);

  const hashedPassword = await bcrypt.hash(password, 10);

  await pacientRepositories.create({
    name,
    email,
    password: hashedPassword,
  });
}

async function signin({ email, password }) {
  const {
    rowCount,
    rows: [user],
  } = await pacientRepositories.findByEmail(email);
  if (!rowCount) throw err.invalidCredentialsError();

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) throw err.invalidCredentialsError();

  const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
    expiresIn: "3h",
  });
  return token;
}

export default {
  create,
  signin,
};
