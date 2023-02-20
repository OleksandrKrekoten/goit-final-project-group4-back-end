const express = require("express");
const router = express.Router();
const {
  addTransactionController,
  deleteTransactionController,
} = require("../../controllers/transactions.controller");
const { tryCatchWrapper } = require("../../helpers/apiHelpers");
// const { authMiddleware } = require("../../middlewares/authMiddleware");
const {
  addTransactionValitation,
  addIdValitation,
} = require("../../middlewares/transactionsValidation");

// router.use(tryCatchWrapper(authMiddleware));

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

module.exports = router;
