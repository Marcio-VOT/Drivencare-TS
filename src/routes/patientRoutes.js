import { Router } from "express";
import { validateSchema } from "../middlewares/schemaValidation.js";
import { createPatient, signinPatient } from "../schemas/patientSchemas.js";
import patientControllers from "../controllers/patientControllers.js";
import authValidation from "../middlewares/authMiddleware.js";

const patientRoutes = Router();

patientRoutes.post(
  "/signup",
  validateSchema(createPatient),
  patientControllers.create
);
patientRoutes.post(
  "/signin",
  validateSchema(signinPatient),
  patientControllers.signin
);
patientRoutes.get(
  "/appointments",
  authValidation,
  patientControllers.listAppointments
);

export default patientRoutes;
