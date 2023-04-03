import appointmentServices from "../services/appointmentServices.js";

async function listAppointments(req, res, next) {
  const { id } = res.locals.user;
  const { type } = res.locals;
  try {
    const { rows } = await appointmentServices.listAppointments({ id, type });
    return res.status(200).send(rows);
  } catch (error) {
    next(error);
  }
}

async function deny(req, res, next) {
  const { id } = req.query;
  try {
  } catch (error) {
    next(error);
  }
}
async function accept(req, res, next) {
  const { id } = req.query;
  try {
  } catch (error) {
    next(error);
  }
}

async function end(req, res, next) {
  const { id } = req.query;
  try {
  } catch (error) {
    next(error);
  }
}

export default {
  listAppointments,
  deny,
  accept,
  end,
};
