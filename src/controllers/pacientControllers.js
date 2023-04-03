import pacientServices from "../services/pacientServices.js";

async function create(req, res, next) {
  const { name, email, password } = req.body;
  try {
    await pacientServices.create({ name, email, password });
    return res.sendStatus(201);
  } catch (error) {
    next(error);
  }
}

async function signin(req, res, next) {
  const { email, password } = req.body;
  try {
    const token = await pacientServices.signin({ email, password });
    return res.send({ token });
  } catch (error) {
    next(error);
  }
}

export default {
  create,
  signin,
};
