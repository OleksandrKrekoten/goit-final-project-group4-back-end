const express = require("express");
const router = express.Router();
const {
  addTransactionController,
  deleteTransactionController,
} = require("../../controllers/transactions.controller");
const {
  expensesMonths,
  incomeMonths,
  fullStatistics,
} = require("../../controllers/transactions/index");
const ctrlWrapper = require("../../middlewares/ctrlWrapper");
const {
  addTransactionValitation,
  addIdValitation,
  mothsResultsValidation
} = require("../../middlewares/transactionsValidation");

router.post(
  "/expenses",
  addTransactionValitation,
  ctrlWrapper(addTransactionController)
);
router.post(
  "/income",
  addTransactionValitation,
  ctrlWrapper(addTransactionController)
);
router.delete(
  "/:transactionId",
  addIdValitation,
  ctrlWrapper(deleteTransactionController)
);

router.get("/incomeMonths", mothsResultsValidation,ctrlWrapper(incomeMonths));

router.get("/expensesMonths", mothsResultsValidation,ctrlWrapper(expensesMonths));

router.get("/fullStatistics", mothsResultsValidation,ctrlWrapper(fullStatistics));

module.exports = router;
