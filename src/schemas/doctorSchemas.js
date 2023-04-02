import Joi from "joi";

export const createDoctor = Joi.object({
  name: Joi.string().min(3).max(80).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  role: Joi.string().min(3).max(50).required(),
  state: Joi.string().min(3).max(80).required(),
  citie: Joi.string().min(3).max(80).required(),
});

export const signinDoctor = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});
