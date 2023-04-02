import doctorServices from "../services/doctorServices.js";

async function create(req, res, next) {
  const { name, email, password, role, state, citie } = req.body;
  try {
    await doctorServices.create({ name, email, password, role, state, citie });
    return res.sendStatus(201);
  } catch (error) {
    next(error);
  }
}

async function signin(req, res, next) {
  const { email, password } = req.body;
  try {
    const token = await doctorServices.signin({ email, password });
    return res.send({ token });
  } catch (error) {
    next(error);
  }
}

export default {
  create,
  signin,
};
