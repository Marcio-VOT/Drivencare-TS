import patientServices from "../services/patientServices.js";
import { Request, Response, NextFunction } from "express";

async function create(req: Request, res: Response, next: NextFunction) {
  const { name, email, password } = req.body;
  try {
    await patientServices.create({ name, email, password });
    return res.sendStatus(201);
  } catch (error) {
    next(error);
  }
}

async function signin(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  try {
    const token = await patientServices.signin({ email, password });
    return res.send({ token });
  } catch (error) {
    next(error);
  }
}

async function listAppointments(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = res.locals.user;
  const { type } = res.locals;
  try {
    const { rows } = await patientServices.listAppointments({ id, type });
    return res.status(200).send(rows);
  } catch (error) {
    next(error);
  }
}

async function createAppointment(
  req: Request,
  res: Response,
  next: NextFunction
) {
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
