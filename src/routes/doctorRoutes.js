import { Router } from "express";
import doctorController from "../controllers/doctorControllers.js";

const doctorRoutes = Router();

doctorRoutes.post("/signup", doctorController.create);
doctorRoutes.post("/signin", doctorController.signin);

export default doctorRoutes;
