const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const compression = require("compression");

const authRouter = require("./routes/authRoute");
const userRouter = require("./routes/userRoute");
const propertyRouter = require("./routes/propertyRoute");
const viewRouter = require("./routes/viewRoute");
const transactionRouter = require("./routes/transactionRoute");
const transactionController = require("./controllers/transactionController");
const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/AppError");

const app = express();

app.enable("trust proxy");

// Implement CORS
// const whitelist = [
//   "http://localhost:5173",
//   "https://homyz-amb.netlify.app",
//   "https://api.stripe.com",
// ];
// const corsOptions = {
//   origin: (origin, callback) => {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new AppError("Not allowed by CORS"));
//     }
//   },
// };
// app.use(cors(corsOptions));
// app.options("*", cors(corsOptions));
app.use(cors());

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  transactionController.webhook
);

// Set security HTTP headers
app.use(helmet());

app.use((req, res, next) => {
  if (req.originalUrl === "/webhook") {
    next(); // Do nothing with the body because I need it in a raw state.
  } else {
    express.json()(req, res, next); // ONLY do express.json() if the received request is NOT a WebHook from Stripe.
  }
});
app.use(morgan("dev"));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      "city",
      "price",
      "country",
      "noOfBathrooms",
      "noOfBedrooms",
      "title",
    ],
  })
);

app.use(compression());

const BASE_URL = "/api/v1";
app.use(`${BASE_URL}/auth`, authRouter);
app.use(`${BASE_URL}/users`, userRouter);
app.use(`${BASE_URL}/properties`, propertyRouter);
app.use(`${BASE_URL}/views`, viewRouter);
app.use(`${BASE_URL}/transactions`, transactionRouter);

app.all("*", (req, _, next) => {
  next(new AppError(`The route ${req.originalUrl} does not exists.`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
