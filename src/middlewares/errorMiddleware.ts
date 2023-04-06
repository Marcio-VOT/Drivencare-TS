import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

export function handleApplicationErrors(
  err,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (["DuplicatedEmailError", "ConflictError"].includes(err.name)) {
    return res
      .status(httpStatus.CONFLICT)
      .send({ message: err.message, email: err.email });
  }

  if (["InvalidCredentialsError", "UnauthorizedError"].includes(err.name)) {
    return res.status(httpStatus.UNAUTHORIZED).send({
      message: err.message,
    });
  }

  if (["NotFoundError"].includes(err.name)) {
    return res.status(httpStatus.NOT_FOUND).send({
      message: err.message,
    });
  }

  return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    error: "InternalServerError",
    message: "Internal Server Error",
  });
}
