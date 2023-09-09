const express = require("express");
const transactionController = require("./../controllers/transactionController");
const authController = require("./../controllers/authController");

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router.post(
  "/checkout-session/:propertyId",
  // authController.restrictTo("user"),
  transactionController.createCheckout
);

router.get(
  "/",
  // authController.restrictTo("user"),
  transactionController.setId,
  transactionController.getTransaction
);

router.use(authController.restrictTo("admin", "agent"));

router.route("/all").get(transactionController.getAllTransactions);

router
  .route("/:id")
  .patch(transactionController.updateTransaction)
  .delete(transactionController.deleteTransaction);

module.exports = router;
