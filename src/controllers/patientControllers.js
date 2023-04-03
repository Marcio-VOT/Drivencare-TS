import patientServices from "../services/patientServices.js";

async function create(req, res, next) {
  const { name, email, password } = req.body;
  try {
    await patientServices.create({ name, email, password });
    return res.sendStatus(201);
  } catch (error) {
    next(error);
  }
}

async function signin(req, res, next) {
  const { email, password } = req.body;
  try {
    const token = await patientServices.signin({ email, password });
    return res.send({ token });
  } catch (error) {
    next(error);
  }
}

async function listAppointments(req, res, next) {
  const { id } = res.locals.user;
  const { type } = res.locals;
  try {
    const { rows } = await patientServices.listAppointments({ id, type });
    return res.status(200).send(rows);
  } catch (error) {
    next(error);
  }
}

async function createAppointment(req, res, next) {
  const { id } = res.locals.user;
  const { type } = res.locals;
  const { date, doctorId } = req.body;
  try {
    await patientServices.createAppointment({
      date,
      doctorId,
      type,
      userId: id,
    });
    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
}

export default {
  create,
  signin,
  listAppointments,
  createAppointment,
};
