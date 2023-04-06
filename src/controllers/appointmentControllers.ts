import { Doctor, Pacient } from "../protocols/user.js";
import appointmentServices from "../services/appointmentServices.js";
import doctorServices from "../services/doctorServices.js";
import { Request, Response, NextFunction } from "express";

async function listAppointments(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = res.locals.user as { id: number };
  const { type } = res.locals as { type: string };
  try {
    const { rows } = await appointmentServices.listAppointments({
      id,
      type,
    } as { id: number; type: string });
    return res.status(200).send(rows);
  } catch (error) {
    next(error);
  }
}

async function deny(req: Request, res: Response, next: NextFunction) {
  const { id } = req.query as { id: string };
  const status: string = "denied";
  const { id: doctorId } = res.locals.user as Doctor;
  const { type } = res.locals;
  try {
    await doctorServices.setStatus({ id, status, type, doctorId });
    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
}
async function accept(req: Request, res: Response, next: NextFunction) {
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

async function end(req: Request, res: Response, next: NextFunction) {
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
