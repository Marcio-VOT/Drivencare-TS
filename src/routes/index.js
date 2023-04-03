import { Router } from "express";
import doctorRoutes from "./doctorRoutes.js";
import patientRoutes from "./patientRoutes.js";

const routes = Router();

routes.use("/doctors", doctorRoutes);
routes.use("/patients", patientRoutes);

export default routes;
