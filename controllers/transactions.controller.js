const {
  addTransaction,
  deleteTransaction,
} = require("../services/transactionsService");

const addTransactionController = async (req, res) => {
  // const { _id: userId } = req.user;
  const { userId, _id, dateTransaction, income, sum, category, description } =
    await addTransaction(req.body);

  return res.status(201).json({
    userId: userId.toString(),
    _id: _id.toString(),
    dateTransaction,
    income,
    sum,
    category,
    description,
  });
};

const deleteTransactionController = async (req, res, next) => {
  const { transactionId } = req.params;
  // const { _id: userId } = req.user;
  const isTransactionDeleted = await deleteTransaction(transactionId, next);
  if (!isTransactionDeleted) return;
  res.status(200).json({
    message: "The transaction is successfully deleted!",
  });
};

module.exports = {
  addTransactionController,
  deleteTransactionController,
};
