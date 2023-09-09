require("dotenv").config({ path: "./config.env" });

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

const mongoose = require("mongoose");
const app = require("./app");

mongoose
  .connect(
    process.env.DATABASE_URL.replace(
      "<password>",
      process.env.DATABASE_PASSWORD
    ),
    {}
  )
  .then(() => console.log("DB Connected Successfull ✅"))
  .catch((err) => console.log(err.message + "❌"));

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`👂 Listening to request on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.log("👋 SIGTERM RECEIVED. Shutting down gracefully");
  server.close(() => {
    console.log("💥 Process terminated!");
  });
});
