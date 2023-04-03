import Joi from "joi";

export const createPatient = Joi.object({
  name: Joi.string().min(3).max(80).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

export const signinPatient = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

export const createAppointment = Joi.object({
  date: Joi.date().required(),
  doctorId: Joi.number().integer().min(1).required(),
});
