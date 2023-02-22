const express = require("express");
const router = express.Router();
const {
  addTransactionController,
  deleteTransactionController,
} = require("../../controllers/transactions/transactions.controller");
const {
  expensesMonths,
  incomeMonths,
  fullStatistics,
} = require("../../controllers/transactions/index");
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const isAuth = require("../../middlewares/isAuth");
const {
  addTransactionValitation,
  addIdValitation,
  mothsResultsValidation,
} = require("../../middlewares/transactionsValidation");

router.use(ctrlWrapper(isAuth));

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

router.get("/incomeMonths", mothsResultsValidation, ctrlWrapper(incomeMonths));

router.get(
  "/expensesMonths",
  mothsResultsValidation,
  ctrlWrapper(expensesMonths)
);

router.get(
  "/fullStatistics",
  mothsResultsValidation,
  ctrlWrapper(fullStatistics)
);

module.exports = router;
