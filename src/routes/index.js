import { Router } from "express";
import doctorRoutes from "./doctorRoutes.js";
import pacientRoutes from "./pacientRoutes.js";

const routes = Router();

routes.use("/doctors", doctorRoutes);
routes.use("/pacients", pacientRoutes);

export default routes;
