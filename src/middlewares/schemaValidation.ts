import err from "../errors/index.js";
import { Request, Response, NextFunction } from "express";

export function validateSchema(schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      throw err.conflictError(errors);
    }
    next();
  };
}
