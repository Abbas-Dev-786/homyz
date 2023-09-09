const AppError = require("../utils/AppError");

const sendDevError = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    name: err.name,
    code: err.code,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

const sendProdError = (err, res) => {
  if (err.isOperational) {
    return res
      .status(err.statusCode)
      .json({ status: err.status, message: err.message });
  } else {
    console.log(err + "💥");

    return res.status(500).json({
      status: "error",
      message: "something went really wrong 😢. We are working on it 🛠.",
    });
  }
};

const handleCastError = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldError = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];

  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError("Invalid token. Please log in again!", 401);

const handleJWTExpiredError = () =>
  new AppError("Your token has expired! Please log in again.", 401);

module.exports = (err, req, res, next) => {
  err.statusCode ||= 500;
  err.status ||= "error";

  if (process.env.NODE_ENV === "dev") {
    sendDevError(err, res);
  } else if (process.env.NODE_ENV === "prod") {
    let error = Object.assign(err);

    if (error.name === "CastError") error = handleCastError(error);
    if (error.code === 11000) error = handleDuplicateFieldError(error);
    if (error.name === "ValidationError") error = handleValidationError(error);
    if (error.name === "JsonWebTokenError") error = handleJWTError();
    if (error.name === "TokenExpiredError") error = handleJWTExpiredError();

    sendProdError(error, res);
  }
};
