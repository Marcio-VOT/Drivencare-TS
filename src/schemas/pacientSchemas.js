import Joi from "joi";

export const createPacient = Joi.object({
  name: Joi.string().min(3).max(80).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

export const signinPacient = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});
