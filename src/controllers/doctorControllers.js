import doctorServices from "../services/doctorServices.js";

async function create(req, res) {
  const { name, email, password, role, state, citie } = req.body;
  try {
    await doctorServices.create({ name, email, password, role, state, citie });
    return res.sendStatus(201);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function signin(req, res) {
  const { email, password } = req.body;
  try {
    const token = await doctorServices.signin({ email, password });
    return res.send({ token });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export default {
  create,
  signin,
};
