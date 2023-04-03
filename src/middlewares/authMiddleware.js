import err from "../errors/index.js";
import jwt from "jsonwebtoken";
import patientRepositories from "../repositories/patientRepositories.js";
import doctorRepositories from "../repositories/doctorRepositories.js";

export default async function authValidation(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) throw err.unauthorizedError();

  const parts = authorization.split(" ");
  if (parts.length !== 2) throw errors.unauthorizedError();

  const [schema, token] = parts;
  if (schema !== "Bearer") throw errors.unauthorizedError();

  jwt.verify(token, process.env.SECRET_KEY, async (error, decoded) => {
    try {
      if (error) throw err.unauthorizedError();

      if (decoded.type === "patient") {
        const {
          rows: [user],
        } = await patientRepositories.findById(decoded.userId);
        if (!user) throw err.unauthorizedError();
        res.locals.user = user;
      } else if (decoded.type === "doctor") {
        const {
          rows: [user],
        } = await doctorRepositories.findById(decoded.userId);
        if (!user) throw err.unauthorizedError();
        res.locals.user = user;
      }
      res.locals.type = decoded.type;
      next();
    } catch (error) {
      next(error);
    }
  });
}
