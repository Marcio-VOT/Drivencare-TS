import { Router } from "express";
import authValidation from "../middlewares/authMiddleware.js";
import appointmentControllers from "../controllers/appointmentControllers.js";

const appointmentRoutes = Router();

appointmentRoutes.get(
  "/",
  authValidation,
  appointmentControllers.listAppointments
);
appointmentRoutes.put("/denied", authValidation, appointmentControllers.deny);
appointmentRoutes.put(
  "/accepted",
  authValidation,
  appointmentControllers.accept
);
appointmentRoutes.put("/ended", authValidation, appointmentControllers.end);

export default appointmentRoutes;
