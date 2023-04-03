function duplicatedEmailError(email) {
  return {
    name: "DuplicatedEmailError",
    message: "There is already an user with given email",
    email,
  };
}

function conflictError(message) {
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

function wrongAuthorizedUserError(type) {
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

export default {
  duplicatedEmailError,
  unauthorizedError,
  invalidCredentialsError,
  conflictError,
  wrongAuthorizedUserError,
};
