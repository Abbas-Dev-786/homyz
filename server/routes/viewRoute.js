const express = require("express");
const authController = require("../controllers/authController");
const viewController = require("../controllers/viewController");

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router.get("/", viewController.getAllView);

router.post(
  "/",
  viewController.setIds,
  viewController.checkViews,
  viewController.createView
);

router
  .route("/:id")
  .get(viewController.getView)
  .delete(viewController.deleteView);

module.exports = router;
