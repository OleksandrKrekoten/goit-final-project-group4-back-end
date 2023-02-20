const express = require("express");
const router = express.Router();
const {
  addTransactionController,
  deleteTransactionController,
} = require("../../controllers/transactions.controller");
const { tryCatchWrapper } = require("../../helpers/apiHelpers");
const {
  expensesMonths,
  incomeMonths,
  fullStatistics,
} = require("../../controllers/transactions/index");
const ctrlWrapper = require("../../middlewares/ctrlWrapper");
const {
  addTransactionValitation,
  addIdValitation,
} = require("../../middlewares/transactionsValidation");

router.post(
  "/expenses",
  addTransactionValitation,
  tryCatchWrapper(addTransactionController)
);
router.post(
  "/income",
  addTransactionValitation,
  tryCatchWrapper(addTransactionController)
);
router.delete(
  "/:transactionId",
  addIdValitation,
  tryCatchWrapper(deleteTransactionController)
);

router.get("/incomeMonths", ctrlWrapper(incomeMonths));

router.get("/expensesMonths", ctrlWrapper(expensesMonths));

router.get("/fullStatistics", ctrlWrapper(fullStatistics));

module.exports = router;
