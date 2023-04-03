import { Router } from "express";
import doctorController from "../controllers/doctorControllers.js";
import { validateSchema } from "../middlewares/schemaValidation.js";
import { createDoctor, signinDoctor } from "../schemas/doctorSchemas.js";
import authValidation from "../middlewares/authMiddleware.js";

const doctorRoutes = Router();

doctorRoutes.post(
  "/signup",
  validateSchema(createDoctor),
  doctorController.create
);
doctorRoutes.post(
  "/signin",
  validateSchema(signinDoctor),
  doctorController.signin
);
doctorRoutes.get("", authValidation, doctorController.listDoctors);
doctorRoutes.get(
  "/appointments",
  authValidation,
  doctorController.listAppointments
);

export default doctorRoutes;
