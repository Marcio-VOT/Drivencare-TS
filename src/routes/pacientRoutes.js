import { Router } from "express";
import doctorController from "../controllers/doctorControllers.js";
import { validateSchema } from "../middlewares/schemaValidation.js";
import { createPacient, signinPacient } from "../schemas/pacientSchemas.js";
import pacientControllers from "../controllers/pacientControllers.js";

const pacientRoutes = Router();

pacientRoutes.post(
  "/signup",
  validateSchema(createPacient),
  pacientControllers.create
);
pacientRoutes.post(
  "/signin",
  validateSchema(signinPacient),
  pacientControllers.signin
);

export default pacientRoutes;
