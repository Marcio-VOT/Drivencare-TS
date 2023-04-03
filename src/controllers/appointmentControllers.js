import appointmentServices from "../services/appointmentServices.js";
import doctorServices from "../services/doctorServices.js";

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
  const status = "denied";
  const { id: doctorId } = res.locals.user;
  const { type } = res.locals;
  try {
    await doctorServices.setStatus({ id, status, type, doctorId });
    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
}
async function accept(req, res, next) {
  const { id } = req.query;
  const status = "accepted";
  const { id: doctorId } = res.locals.user;
  const { type } = res.locals;
  try {
    await doctorServices.setStatus({ id, status, type, doctorId });
    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
}

async function end(req, res, next) {
  const { id } = req.query;
  const status = "ended";
  const { id: doctorId } = res.locals.user;
  const { type } = res.locals;
  try {
    await doctorServices.setStatus({ id, status, type, doctorId });
    return res.sendStatus(200);
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
