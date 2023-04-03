import { Router } from "express";
import authValidation from "../middlewares/authMiddleware.js";
import appointmentControllers from "../controllers/appointmentControllers.js";

const appointmentRoutes = Router();

appointmentRoutes.get(
  "/",
  authValidation,
  appointmentControllers.listAppointments
);
appointmentRoutes.put(
  "/denied",
  authValidation,
  appointmentControllers.listAppointments
);
appointmentRoutes.put(
  "/accepted",
  authValidation,
  appointmentControllers.listAppointments
);
appointmentRoutes.put(
  "/ended",
  authValidation,
  appointmentControllers.listAppointments
);

export default appointmentRoutes;
