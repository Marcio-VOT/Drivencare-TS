import doctorServices from "../services/doctorServices.js";
import { Request, Response, NextFunction } from "express";

async function create(req: Request, res: Response, next: NextFunction) {
  const { name, email, password, role, state, city } = req.body;
  try {
    await doctorServices.create({ name, email, password, role, state, city });
    return res.sendStatus(201);
  } catch (error) {
    next(error);
  }
}

async function signin(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  try {
    const token = await doctorServices.signin({ email, password });
    return res.send({ token });
  } catch (error) {
    next(error);
  }
}

async function listDoctors(req: Request, res: Response, next: NextFunction) {
  const { role, state, city } = req.query;
  try {
    const { rows } = await doctorServices.listDoctors({ role, state, city });
    return res.status(200).send(rows);
  } catch (error) {
    next(error);
  }
}

async function listAppointments(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { type } = res.locals;
  const { id } = res.locals.user;
  try {
    const { rows } = await doctorServices.listAppointments({ id, type });
    return res.status(200).send(rows);
  } catch (error) {
    next(error);
  }
}

export default {
  create,
  signin,
  listDoctors,
  listAppointments,
};
