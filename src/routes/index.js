import { Router } from "express";
import doctorRoutes from "./doctorRoutes.js";
import patientRoutes from "./patientRoutes.js";
import appointmentRoutes from "./appointmentRoutes.js";

const routes = Router();

routes.use("/doctors", doctorRoutes);
routes.use("/patients", patientRoutes);
routes.use("/appointments", appointmentRoutes);

export default routes;
