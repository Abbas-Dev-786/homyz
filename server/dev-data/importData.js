require("dotenv").config({ path: "./../config.env" });
const mongoose = require("mongoose");
const fs = require("fs");
const Property = require("../models/propertyModel");

mongoose
  .connect(
    process.env.DATABASE_URL.replace(
      "<password>",
      process.env.DATABASE_PASSWORD
    ),
    {}
  )
  .then(() => console.log("DB Connected Successfully"))
  .catch((err) => console.log(err.message));

const PropertyData = JSON.parse(
  fs.readFileSync(`${__dirname}/property-data.json`, "utf-8")
);

const importData = async () => {
  try {
    console.log(PropertyData);
    await Property.create(PropertyData);
    process.exit(0);
  } catch (error) {
    console.log(error.message + "💥");
    process.exit(1);
  }
};

if (process.argv[2] === "--import") {
  importData();
}
