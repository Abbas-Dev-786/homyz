const express = require("express");
const propertyController = require("./../controllers/propertyController");
const authController = require("./../controllers/authController");
const viewRouter = require("./viewRoute");

const router = express.Router();

router.use("/:propertyId/views", viewRouter);

router.get("/cities", propertyController.getAllCities);
router.get(
  "/top10properties",
  propertyController.getTop10,
  propertyController.getAllProperties
);

router
  .route("/")
  .get(propertyController.getAllProperties)
  .post(
    authController.protect,
    authController.restrictTo("admin", "agent"),
    propertyController.setCoordinates,
    propertyController.createProperty
  );

router
  .route("/:id")
  .get(propertyController.getProperty)
  .patch(
    authController.protect,
    authController.restrictTo("admin", "agent"),
    propertyController.updateProperty
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin", "agent"),
    propertyController.deleteProperty
  );

module.exports = router;
