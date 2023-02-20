const { Transactions } = require("../models/transactions");
const createError = require("http-errors");

const getTransactionById = async (transactionId) => {
  const transaction = await Transactions.findOne({
    _id: transactionId,
  });
  return transaction;
};

const addTransaction = async ({
  userId,
  dateTransaction,
  income,
  sum,
  category,
  description,
}) => {
  const transaction = new Transactions({
    userId,
    dateTransaction,
    income,
    sum,
    category,
    description,
  });
  transaction.markModified("dateTransaction");
  await transaction.save();
  return transaction;
};

const deleteTransaction = async (transactionId, next) => {
  const transaction = await getTransactionById(transactionId);
  if (!transaction) return next(createError(404, "No transactions found"));
  await Transactions.findByIdAndRemove(transactionId);
  if (!(await getTransactionById(transactionId))) return true;
};

module.exports = {
  addTransaction,
  deleteTransaction,
};
