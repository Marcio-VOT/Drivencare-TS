function duplicatedEmailError(email: string | string[]) {
  return {
    name: "DuplicatedEmailError",
    message: "There is already an user with given email",
    email,
  };
}

function conflictError(message: string | string[]) {
  return {
    name: "ConflictError",
    message,
  };
}

function unauthorizedError() {
  return {
    name: "UnauthorizedError",
    message: "You must be signed in to continue",
  };
}

function wrongAuthorizedUserError(type: string | string[]) {
  return {
    name: "UnauthorizedError",
    message: `You must be signed in as a${
      type === "doctor" ? "patient" : "doctor"
    } to continue`,
  };
}

function invalidCredentialsError() {
  return {
    name: "InvalidCredentialsError",
    message: "Email or password are incorrect",
  };
}

function noDataError(data: any) {
  return {
    name: "noDataError",
    message: "No data was found",
    data,
  };
}

export default {
  duplicatedEmailError,
  unauthorizedError,
  invalidCredentialsError,
  conflictError,
  wrongAuthorizedUserError,
  noDataError,
};
